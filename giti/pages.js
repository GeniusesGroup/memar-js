/* For license and copyright information please see LEGAL file in repository */

import './error.js'
import '../users.js'

Giti.Pages = {
    ActivePage: null,
    PreviousPage: null,

    // poolByID store all pages. keys is PageID and use for page name in URL too.
    poolByID: {},
}

/**
 * register given page in pages.poolByID and call page.Init() to initialize page.
 * @param {object} page 
 */
Giti.Pages.RegisterPage = function (page) {
    this.poolByID[page.ID] = page
}

/**
 * get a page by given page ID
 * @param {string} pageID 
 */
Giti.Pages.GetByID = function (pageID) {
    return this.poolByID[pageID]
}

/** 
 * Router will route to page and optional uri! and also add related page element to body!
 * @param {object} page
 * @param {string} uri
 */
Giti.Pages.Router = async function (page, uri) {
    // Warn active page about routing occur and do what it want to do!
    if (Giti.Pages.ActivePage) {
        const leave = await Giti.Pages.ActivePage.DisconnectedCallback()
        if (leave === false) return
    }
    // Save previous page for any usage!
    Giti.Pages.PreviousPage = Giti.Pages.ActivePage

    // Tell others about new routing to do whatever they must do on url change!
    window.dispatchEvent(new Event('urlChanged'))

    if (Object.keys(page).length === 0) {
        const URI = new URL(uri, window.location.href)

        page.ID = URI.pathname
        if (page.ID.charAt(0) === '/') page.ID = page.ID.substring(1)
        // TODO::: accept / at end of URL??
        if (page.ID.charAt(page.ID.length - 1) === '/') page.ID = page.ID.substring(0, page.ID.length - 1)

        page.Conditions = {}
        // Set page condition same as parameters in URLs!
        // TODO::: handle conditions types like boolean
        for (let sp of URI.searchParams.keys()) {
            if (!page.Conditions[sp]) {
                let queryValue = URI.searchParams.get(sp)
                if (queryValue === "undefined") queryValue = ""
                page.Conditions[sp] = queryValue.replaceAll(" ", "+")
            } else {
                page.Conditions[sp] = URI.searchParams.getAll(sp).replaceAll(" ", "+")
            }
        }

        // Set page state same as hash in URLs!
        page.State = URI.hash
    }

    // push state into the history stack
    window.history.pushState({}, "", uri)

    if (page.ID === "landings") {
        if (page.Conditions.id) {
            Giti.Pages.LoadLanding(page.Conditions.id)
        } else {
            Giti.Pages.Router({ ID: "error-404" }, "")
        }
        return
    }

    // Find requested app!
    Giti.Pages.ActivePage = Giti.Pages.poolByID[page.ID]
    if (!Giti.Pages.ActivePage) {
        // Requested page not exist
        Giti.Pages.Router({ ID: "error-404" }, "")
        return
    }

    if (Giti.Pages.ActivePage.ID !== "error-404" || Giti.Pages.ActivePage.ID !== "error-403" || Giti.Pages.ActivePage.ID !== "error-500") {
        // check requested condition support by page!
        for (let conditionName in page.Conditions) {
            if (conditionName !== "hl"  // hl==hrefLanguage
                && conditionName !== "title" // use in share URLs
                && conditionName !== "utm_source"
                && conditionName !== "utm_medium"
                && conditionName !== "utm_campaign"
                && conditionName !== "rd"
                && Giti.Pages.ActivePage.Conditions[conditionName] === undefined) {  // rd==redirect
                // Requested page with desire condition not exist
                Giti.Pages.Router({ ID: "error-404" }, "")
                return
            }

            if (Array.isArray(Giti.Pages.ActivePage.Conditions[conditionName]) && !Array.isArray(page.Conditions[conditionName])) {
                Giti.Pages.ActivePage.Conditions[conditionName] = [page.Conditions[conditionName]]
            } else {
                Giti.Pages.ActivePage.Conditions[conditionName] = page.Conditions[conditionName]
            }
        }
    }

    // Update page title with page full name and update some meta tags!
    // This data also can be update in each page by ConnectedCallback method!
    window.document.title = Giti.Pages.ActivePage.Info.Name
    window.document.description.content = Giti.Pages.ActivePage.Info.Description
    window.document.robots.content = Giti.Pages.ActivePage.Robots
    // Twitter card  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started.html
    // The Open Graph protocol https://www.ogp.me/

    // Add page HTML & CSS to DOM
    // TODO::: not efficient below code!
    pageStylesElement.innerHTML = Giti.Pages.ActivePage.CSS

    Giti.Pages.ActivePage.ConnectedCallback()
}

Giti.Pages.LoadLanding = async function (landingName) {
    // push state into the history stack
    window.history.pushState({}, "", "/landings?id=" + landingName)

    const lang = users.active.ContentPreferences.Language.iso639_1 || Application.ContentPreferences.Language.iso639_1
    try {
        const res = await fetch('/' + landingName + "-" + lang + ".html")
        switch (res.status) {
            case 200:
                const htmlRes = await res.text()
                window.document.body.innerHTML = htmlRes
                window.document.title = landingName
                break
            case 404:
                Giti.Pages.Router({ ID: "error-404" }, "")
                break
            default:
                Giti.Pages.Router({ ID: "error-500" }, "")
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
    Giti.Pages.Router({}, goUrl.href)
}
window.addEventListener('click', clickListener, false)

function stateChangeListener(event) {
    // console.log(event)
    // prevent the default navigate
    event.preventDefault()

    // Do routing instead of reload page!
    Giti.Pages.Router({}, window.location.href)
}
window.addEventListener('popstate', stateChangeListener, false)
window.addEventListener('pushState', stateChangeListener, false)

const page = {
    ID: "", // same as pages key
    Conditions: { // As engine standard, URL parameters use as page Conditions to show information
        id: "", // e.g. RecordID to display information on page
    },
    State: "",      // As standard, URL hash use as page State to show information from that state
    Robots: "",     // "all", "noindex", "nofollow", "none", "noarchive", "nosnippet", "notranslate", "noimageindex", "unavailable_after: [RFC-850 date/time]"
    Icon: "",
    Related: [],
    Info: { Name: "", ShortName: "", Tagline: "", Slogan: "", Description: "", Tags: [] },
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {},
}