/* For license and copyright information please see LEGAL file in repository */

Application.pages = {
    activePage: null,

    poolByURNName: {},
}

Application.ActivePage = function () { return this.pages.activePage }

/**
 * register given page in the application
 * @param {object} page 
 */
Application.RegisterPage = function (page) {
    this.poolByURNName[page.URN.Name] = page
}

/**
 * GetPageByURNName return a page by given page URN name
 * @param {string} name 
 */
Application.GetPageByURNName = function (urnName) { return this.poolByURNName[urnName] }

/** 
 * ActivatePage will route to the page!
 * @param {page} page
 * @param {pageState} state
 */
Application.ActivatePage = async function (page, state) {
    // Warn active page about routing occur and do what it want to do!
    if (this.pages.activePage) {
        const leave = await this.pages.activePage.DisconnectedCallback()
        if (leave === false) return
    }

    this.pages.activePage = page
    page.activeState = state
    this.history.newState(state)

    // Add page HTML & CSS to DOM
    // TODO::: not efficient below code!
    pageStylesElement.innerHTML = page.CSS

    await page.ConnectedCallback()

    // Update page title with page full name and update some meta tags!
    // This data also can be update in each page by ConnectedCallback method!
    window.document.title = state.Title
    window.document.description.content = state.Description
    window.document.robots.content = page.Robots
    // Twitter card  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started.html
    // The Open Graph protocol https://www.ogp.me/
}

/**
 * ActivatePageByURL decode the given URL and will route to the desire page with desire state.
 * @param {string} url
 */
Application.ActivatePageByURL = async function (url) {
    const URI = new URL(url, window.location.href)

    let pageURNName = URI.pathname
    if (pageURNName.charAt(0) === '/') pageURNName = pageURNName.substring(1)
    // TODO::: accept / at end of URL at all??
    if (pageURNName.charAt(pageURNName.length - 1) === '/') pageURNName = pageURNName.substring(0, pageURNName.length - 1)

    if (pageURNName === "landings") {
        const landingName = URI.searchParams.get("id")
        if (landingName) {
            this.LoadLanding(landingName)
        } else {
            this.ActivatePage(this.GetPageByURNName("error-404"), null)
        }
        return
    }

    // Find requested app!
    const page = this.GetPageByURNName(pageURNName)
    if (!page) {
        // Requested page not exist
        this.ActivatePage(Application.GetPageByURNName("error-404"), null)
        return
    }

    const pageState = {
        Page: page,
        Title: page.Info.Name,
        Description: page.Info.Description,
        Fragment: URI.hash,
    }
    // Set pageState conditions same as parameters in URL
    for (let sp of URI.searchParams.entries()) {
        const conditionName = sp[0]
        // check requested condition support by page!
        if (!page.acceptedConditions.includes(conditionName)
            && conditionName !== "hl"  // hl==hrefLanguage
            && conditionName !== "title" // use in share URLs
            && conditionName !== "utm_source"
            && conditionName !== "utm_medium"
            && conditionName !== "utm_campaign"
            && conditionName !== "rd") { // rd==redirect
            // Requested page with desire condition not exist
            this.ActivatePage(this.GetPageByURNName("error-404"), null)
            return
        }
        const conditionValue = sp[1]
        pageState.Conditions[conditionName] = conditionValue.replaceAll(" ", "+") // TODO::: have problem with base64 in URL query!
    }

    await this.ActivatePage(page, pageState)
}

Application.pages.LoadLanding = async function (landingName) {
    // push state into the history stack
    window.history.pushState({}, "", "/landings?id=" + landingName)

    const lang = OS.User.ContentPreferences.Language.iso639_1 || Application.ContentPreferences.Language.iso639_1
    try {
        const res = await fetch('/' + landingName + "-" + lang + ".html")
        switch (res.status) {
            case 200:
                const htmlRes = await res.text()
                window.document.body.innerHTML = htmlRes
                window.document.title = landingName
                break
            case 404:
                this.ActivatePage(this.GetPageByURNName("error-404"), null)
                break
            default:
                this.ActivatePage(this.GetPageByURNName("error-500"), null)
        }
    } catch (err) {
        // TODO::: network error
    }
}

/**
 * 
 * Listeners
 * 
 */
function clickListener(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return

    const anchor = event.composedPath().find(n => n.tagName === 'A')
    if (!anchor || anchor.target || !anchor.href ||
        anchor.hasAttribute('download') ||
        anchor.getAttribute('rel') === 'external') return

    const goUrl = new URL(anchor.href)
    // don't pushState if the URL is for a different host! It also check for "mailto"!
    if (window.location.host !== goUrl.host) return

    // prevent the default link click
    event.preventDefault()

    // Don't act if requested page is same. It also prevent reload page in empty href.
    if (goUrl.href === window.location.href) return

    // Do routing instead of reload page!
    this.ActivatePageByURL(goUrl.href)
}
window.addEventListener('click', clickListener, false)

function stateChangeListener(event) {
    // console.log(event)
    // prevent the default navigate
    event.preventDefault()

    // Do routing instead of reload page!
    this.ActivatePageByURL(window.location.href)
}
window.addEventListener('popstate', stateChangeListener, false)
window.addEventListener('pushState', stateChangeListener, false)
