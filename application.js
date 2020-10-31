/* For license and copyright information please see LEGAL file in repository */

import './polyfill.js'
import './cookie.js'

/**
 * Experimental "Application" objects use to expand default browser window object!
 * Application default data just use if user have not distinction yet otherwise user defaults in Application.UserPreferences will used!
 */
const Application = {
    Icon: "", // Image location
    // !! Security Warning !! app name and icon must have approved mechanism with domain register process!!
    Info: { Name: "", ShortName: "", Tagline: "", Slogan: "", Description: "", Tags: [] },
    ContentPreferences: {  // HTML Preferences
        Languages: [], // Supported languages by app in In iso639_1 format
        Language: {},
        Charset: "", // "utf-8" || 
        Currencies: [], // Supported currencies by app In ISO_4217
        Currency: {},
        Region: {},
    },
    PresentationPreferences: {  // CSS Preferences
        DesignLanguage: "", // "material" || "flat" || ""
        Contrast: "", // "no-preference" || "high" || "low"
        ColorScheme: "", // "no-preference" || "light" || "dark"
        ThemeColor: "", // ?? Duplicate with PrimaryColor CSS variable!!??
        InvertedColors: false,
        ReducedMotion: false,
        ReducedTransparency: false,
        PrimaryFontFamily: "",
        SecondaryFontFamily: "",
        Display: "", // "fullscreen" || "standalone" || "minimal-ui" || "browser" https://developer.mozilla.org/en-US/docs/Web/Manifest/display
        Orientation: "", // "any" || "natural" || "landscape" || "portrait" https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation
        Viewport: {} // https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag
    },
    HomePage: "", // Application start page from written list keys
    MostUsedPages: [""],

    ActivePage: null,
    PreviousPage: null,
    // Pages store all services (pages) and in locales names. keys is use for page name in URL too.
    // Can load all pages element on start || load most used pages || lazy-load on user request! (better idea??)
    Pages: {
        "": {
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
        },
    },

    DesignLanguageStyles: "", // Link element, Add auto by Application.LoadDesignLanguageStyles() method
    PrimaryFont: null, // FontFace(), Add auto by Application.LoadFontFamilies() method
    SecondaryFont: null, // FontFace(), Add auto by Application.LoadFontFamilies() method

    ActiveUserID: "",
    UsersID: []
}

Application.UserPreferences = {
    UserID: "",
    UserName: "",
    UserPicture: "",
    ContentPreferences: {
        Language: {
            englishName: "",
            nativeName: "",
            iso639_1: "",
            iso639_2T: "",
            iso639_2B: "",
            iso639_3: "",
            dir: "",
        },
        Region: {
            englishName: "",
            nativeName: "",
            iso3166_1_a2: "",
            iso3166_1_a3: "",
            iso3166_1_num: "",
            phone: "",
            continent: "",
            capital: "",
            currency: "",
            languages: [""]
        },
        Currency: {
            englishName: "",
            nativeName: "",
            iso4217: "",
            iso4217_num: 0,
            symbol: "",
        },
    },
    PresentationPreferences: {
        DesignLanguage: "material",
        Contrast: "",
        ColorScheme: "no-preference",
        InvertedColors: false,
        ReducedMotion: false,
        ReducedTransparency: false,
        PrimaryFontFamily: "Roboto",
        SecondaryFontFamily: "",
    },
    HomePage: "",
    MostUsedPages: null, // []
    // Misc or miscellaneous key use by any page or widget to store needed persistent locale data
    Misc: {}
}

/**
 * Initialize method initialize Application to set||update app data so never change reference of Application to set||update data.
 * Function app parameter structure is Application object with as much as you want custom data!
 */
Application.Initialize = function () { }

/**
 * Start the application
 */
Application.Start = function () {
    const firstTime = Application.LoadState()

    Application.LoadDesignLanguageStyles()
    Application.LoadColorScheme()
    Application.LoadFontFamilies()

    const initScript = document.createElement('script')
    initScript.src = "/init-" + Application.UserPreferences.ContentPreferences.Language.iso639_1 + ".js"
    document.head.appendChild(initScript)
    initScript.onload = function () {
        Polyfill.SetLangAndDir()
        Polyfill.PWA()
        Polyfill.Meta()

        if (firstTime) {
            Polyfill.SupportedLanguagesAlternateLink()
            Polyfill.SuggestLanguage()
            Application.Router({}, window.location.href)
        } else {
            // First check user preference in PWA version
            if (!(window.matchMedia('(display-mode: browser)').matches) && window.location.pathname === "/") {
                window.history.replaceState({}, "", "/" + Application.UserPreferences.HomePage)
                Application.Router({ ID: Application.UserPreferences.HomePage }, "")
            } else {
                // Do normal routing!
                Application.Router({}, window.location.href)
            }
        }
    }
}

const GuestUserID = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

/**
 * LoadState read active Application state from browser localStorage.
 * return true if it is first time app run from this browser
 */
Application.LoadState = function () {
    Application.ActiveUserID = cookie.GetByName("U")  // User ID
    if (Application.ActiveUserID === "") Application.ActiveUserID = GuestUserID

    let up = localStorage.getItem(Application.ActiveUserID)
    if (up) {
        copyObject(JSON.parse(up), Application.UserPreferences)
    } else {
        Application.ActiveUserID = GuestUserID
        Application.UserPreferences.UserPicture = "/images/not-login-user.svg"
        Application.UserPreferences.ContentPreferences = Application.ContentPreferences
        Application.UserPreferences.PresentationPreferences = Application.PresentationPreferences
        Application.UserPreferences.HomePage = Application.HomePage
        return true
    }

    let usersID = localStorage.getItem('UsersID')
    if (usersID) Application.UsersID = JSON.parse(usersID)
    return false
}

/**
 * SaveState write active Application state to browser localStorage.
 */
Application.SaveState = function () {
    if (Application.UsersID) localStorage.setItem('UsersID', JSON.stringify(Application.UsersID))
    if (Application.UserPreferences) localStorage.setItem(Application.ActiveUserID, JSON.stringify(Application.UserPreferences))
}

/**
 * ChangeActiveUser change desire user state from browser localStorage to active UserPreferences.
 * return true if desire userID is new and no saved preferences found.
 * @param {string} userID 
 */
Application.ChangeActiveUser = function (userID) {
    // First save active user preferences
    localStorage.setItem(Application.ActiveUserID, JSON.stringify(Application.UserPreferences))

    Application.ActiveUserID = userID

    let up = localStorage.getItem(userID)
    if (up) {
        copyObject(JSON.parse(up), Application.UserPreferences)
    } else {
        Application.UserPreferences.UserID = userID
        if (!Application.UsersID.includes(userID)) Application.UsersID.push(Application.ActiveUserID)
        return true
    }
}

let designLanguageElement
let themeStylesElement
let pageStylesElement

// function init() {
designLanguageElement = window.document.createElement("link")
designLanguageElement.rel = "stylesheet"
designLanguageElement.type = "text/css"
window.document.head.appendChild(designLanguageElement)

// Load theme early to respect page styles!
themeStylesElement = window.document.createElement('link')
themeStylesElement.rel = "stylesheet"
themeStylesElement.type = "text/css"
window.document.head.appendChild(themeStylesElement)

pageStylesElement = window.document.createElement("style")
window.document.head.appendChild(pageStylesElement)
// }
// init()

/**
 * Load active design language styles indicated in user preferences!
 */
Application.LoadDesignLanguageStyles = function () {
    if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "material") {
        Application.DesignLanguageStyles = "/design-language--material.css"
        designLanguageElement.href = Application.DesignLanguageStyles
        // Load related icon font family
        // https://fonts.googleapis.com/icon?family=Material+Icons
        const iconsFont = new FontFace('Material Icons', 'url(https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)');
        iconsFont.load()
        window.document.fonts.add(iconsFont)
    } else if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "flat") Application.DesignLanguageStyles = "/design-language--flat.css"
    else if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "fluent") Application.DesignLanguageStyles = "/design-language--fluent.css"
    else if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "ant") Application.DesignLanguageStyles = "/design-language--ant.css"
}

/**
 * Load active font families by their names in user preferences!
 */
Application.LoadFontFamilies = function () {
    if (Application.UserPreferences.PresentationPreferences.PrimaryFontFamily === "Roboto") {
        // https://fonts.googleapis.com/css?family=Roboto
        Application.PrimaryFont = new FontFace('Roboto', 'url(https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu72xKOzY.woff2)');
        Application.PrimaryFont.load()
        window.document.fonts.add(Application.PrimaryFont)
    }
}

/**
 * Set active color scheme
 * Use generic variables to easy change theme (theming) anywhere.
 */
Application.LoadColorScheme = function () {
    if (Application.UserPreferences.PresentationPreferences.ColorScheme === "no-preference") {
        // get browser or OS preference
        themeStylesElement.href = "/theme-light.css"
    }
    else if (Application.UserPreferences.PresentationPreferences.ColorScheme === "dark") themeStylesElement.href = "/theme-light.css"
    else if (Application.UserPreferences.PresentationPreferences.ColorScheme === "light") themeStylesElement.href = "/theme-light.css"
}

/**
 * copyObject use to copy an object by structure and values to other!
 * @param {object} src 
 * @param {object} copyTo 
 */
function copyObject(src, copyTo) {
    /**
     * if conflict set to true it means copy objects have conflicts in all or some keys or values
     */
    let conflict = false

    for (let key in copyTo) {
        if (typeof src[key] === "undefined") {
            conflict = true
            continue
        }

        if (typeof copyTo[key] === 'object') {
            if (typeof src[key] !== 'object') {
                conflict = true
                continue
            }

            copyObject(src[key], copyTo[key])
        } else {
            copyTo[key] = src[key]
        }
    }

    return conflict
}

/** 
 * Router will route to page and optional uri! and also add related page element to body!
 * @param {object} page
 * @param {string} uri
 */
Application.Router = function (page, uri) {
    // Tell others about new routing to do whatever they must do on url change!
    window.dispatchEvent(new Event('urlChanged'))

    if (Object.keys(page).length === 0) {
        const URI = new URL(uri || window.location.href)

        const uriPathParts = URI.pathname.split("/")
        if (uriPathParts.length > 2) Application.Router({ ID: "error-404" }, "")
        page.ID = uriPathParts[1]

        page.Conditions = {}
        // Set page condition same as parameters in URLs!
        for (let sp of URI.searchParams.keys()) {
            if (!page.Conditions[sp]) {
                page.Conditions[sp] = URI.searchParams.get(sp)
            } else {
                page.Conditions[sp] = URI.searchParams.getAll(conditionName)
            }
        }

        // Set page state same as hash in URLs!
        page.State = URI.hash
    }

    // Warn active page about routing occur and do what it want to do!
    if (Application.ActivePage) Application.ActivePage.DisconnectedCallback()
    // Save previous page for any usage!
    Application.PreviousPage = Application.ActivePage

    if (page.ID === "landings") {
        if (page.Conditions.id) {
            Application.LoadLanding(page.Conditions.id)
        } else {
            Application.Router({ ID: "error-404" }, "")
        }
        return
    }

    // Find requested app!
    Application.ActivePage = Application.Pages[page.ID]
    if (!Application.ActivePage) {
        // Requested page not exist
        Application.Router({ ID: "error-404" }, "")
        return
    }

    if (Application.ActivePage.ID !== "error-404" || Application.ActivePage.ID !== "error-403" || Application.ActivePage.ID !== "error-500") {
        // check requested condition support by page!
        for (let conditionName in page.Conditions) {
            if (conditionName !== "hl"  // hl==hrefLanguage
                && conditionName !== "utm_source"
                && conditionName !== "utm_medium"
                && conditionName !== "utm_campaign"
                && conditionName !== "rd"
                && Application.ActivePage.Conditions[conditionName] === undefined) {  // rd==redirect
                // Requested page with desire condition not exist
                Application.Router({ ID: "error-404" }, "")
                return
            }

            if (Array.isArray(Application.ActivePage.Conditions[conditionName]) && !Array.isArray(page.Conditions[conditionName])) {
                Application.ActivePage.Conditions[conditionName] = [page.Conditions[conditionName]]
            } else {
                Application.ActivePage.Conditions[conditionName] = page.Conditions[conditionName]
            }
        }
    }

    // Update page title with page full name and update some meta tags!
    // This data also can be update in each page by ConnectedCallback method!
    window.document.title = Application.ActivePage.Info.Name
    window.document.description.content = Application.ActivePage.Info.Description
    window.document.robots.content = Application.ActivePage.Robots
    // Twitter card  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started.html
    // The Open Graph protocol https://www.ogp.me/

    // Add page HTML & CSS to DOM
    // TODO::: not efficient below code!
    pageStylesElement.innerHTML = Application.ActivePage.CSS

    Application.ActivePage.ConnectedCallback()
}

Application.LoadLanding = async function (landingName) {
    const lang = Application.UserPreferences.ContentPreferences.Language.iso639_1 || Application.ContentPreferences.Language.iso639_1
    try {
        const res = await fetch('/' + landingName + "-" + lang + ".html")
        switch (res.status) {
            case 200:
                const htmlRes = await res.text()
                window.document.body.innerHTML = htmlRes
                window.document.title = landingName
                break
            case 404:
                Application.Router({ ID: "error-404" }, "")
                break
            default:
                Application.Router({ ID: "error-500" }, "")
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

    // push state into the history stack
    window.history.pushState(JSON.parse(anchor.getAttribute('state')) ||
        window.history.state, anchor.getAttribute('title'), anchor.href)

    // Do routing instead of reload page!
    Application.Router({}, goUrl.href)
}
window.addEventListener('click', clickListener, false)

function stateChangeListener(event) {
    // prevent the default navigate
    event.preventDefault()

    // Do routing instead of reload page!
    Application.Router({}, window.location.href)
}
window.addEventListener('popstate', stateChangeListener, false)
window.addEventListener('pushState', stateChangeListener, false)

// Save UserPreferences on user exit app!
window.addEventListener('beforeunload', Application.SaveState, false)
