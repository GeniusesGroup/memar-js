/* For license and copyright information please see LEGAL file in repository */

import { Languages } from './languages.js'
import { Regions } from './regions.js'

/**
 * Experimental "Application" objects use to expand default browser window object!
 * Application default data just use if user have not distinction yet otherwise user defaults in Application.UserPreferences will used!
 */
window.Application = {
    Icon: "", // Image location
    Info: { // !! Security Warning !! app name and icon must have approved mechanism with domain register process!!
        "": { Name: "", ShortName: "", Tagline: "", Slogan: "", Description: "", Tags: [] },
    },
    LocaleInfo: {}, // Add auto by Application.Localize() method
    ContentPreferences: {  // HTML Preferences
        Languages: ["", "", "",], // Supported languages by app in In iso639_1 format
        Language: {},
        Charset: "", // "utf-8" || 
        Currencies: ["", ""], // Supported currencies by app In ISO_4217
        Currency: {},
    },
    PresentationPreferences: {  // CSS Preferences
        DesignLanguage: "", // "material" || "flat" || ""
        Contrast: "", // "no-preference" || "high" || "low"
        ColorScheme: "", // "no-preference" || "light" || "dark"
        ThemeColor: "", // ?? Duplicate with PrimaryColor CSS variable!!??
        InvertedColors: Boolean,
        ReducedMotion: Boolean,
        ReducedTransparency: Boolean,
        PrimaryFontFamily: "",
        SecondaryFontFamily: "",
        Display: "", // "fullscreen" || "standalone" || "minimal-ui" || "browser" https://developer.mozilla.org/en-US/docs/Web/Manifest/display
        Orientation: "", // "any" || "natural" || "landscape" || "portrait" https://developer.mozilla.org/en-US/docs/Web/Manifest/orientation
        Viewport: {} // https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag
    },
    HomePage: "", // Application start page from written list keys
    ActivePage: null,
    PreviousPage: null,
    MostUsedPages: [""],
    // Pages store all services (pages) and in locales names. keys is use for page name in URL too.
    // Can load all pages element on start || load most used pages || lazy-load on user request! (better idea??)
    Pages: {
        "": {
            ID: "", // same as pages key
            ActiveURI: "",
            PreviousURI: "",
            RecordID: null, // As engine standard, second part of URL use as RecordID to display information
            Condition: {}, // As engine standard, URL parameters use as page Condition to show information
            State: "", // As standard, URL hash use as page State to show information from that state
            Robots: "", // "all", "noindex", "nofollow", "none", "noarchive", "nosnippet", "notranslate", "noimageindex", "unavailable_after: [RFC-850 date/time]"
            Icon: "",
            Related: ["", ""],
            Info: {
                "": { Name: "", ShortName: "", Tagline: "", Slogan: "", Description: "", Tags: [] },
            },
            LocaleInfo: {}, // Add auto by Application.Localize() method
            Text: {
                "": ["", "", ""]
            },
            LocaleText: {},
            HTML: "",
            CSS: "",
            Templates: {},
        },
    },
    Landings: {},
    Widgets: {},
    UserPreferences: {
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
            InvertedColors: Boolean,
            ReducedMotion: Boolean,
            ReducedTransparency: Boolean,
            PrimaryFontFamily: "Roboto",
            SecondaryFontFamily: "",
        },
        UsersState: { // Store user data state!
            ActiveUserID: "",
            UsersID: [],
        },
        HomePage: "",
        MostUsedPages: null, // []
        // Misc or miscellaneous key use by any page or widget to store needed persistent locale data
        Misc: {}
    },
    DesignLanguageStyles: "", // Link element, Add auto by Application.LoadDesignLanguageStyles() method
    PrimaryFont: null, // FontFace(), Add auto by Application.LoadFontFamilies() method
    SecondaryFont: null, // FontFace(), Add auto by Application.LoadFontFamilies() method
    Polyfill: {}
}

/**
 * Load active design language styles indicated in user preferences!
 */
Application.LoadDesignLanguageStyles = function () {
    if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "material") {
        Application.DesignLanguageStyles = "/design-languages/design-language--material.css"
        designLanguageElement.href = Application.DesignLanguageStyles
        // Load related icon font family
        // https://fonts.googleapis.com/icon?family=Material+Icons
        const iconsFont = new FontFace('Material Icons', 'url(https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)');
        iconsFont.load()
        window.document.fonts.add(iconsFont)
    } else if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "flat") Application.DesignLanguageStyles = "/design-languages/design-language--flat.css"
    else if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "fluent") Application.DesignLanguageStyles = "/design-languages/design-language--fluent.css"
    else if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "ant") Application.DesignLanguageStyles = "/design-languages/design-language--ant.css"
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
        themeStylesElement.href = "/design-languages/theme-light.css"
    } else if (Application.UserPreferences.PresentationPreferences.ColorScheme === "dark") themeStylesElement.href = "/design-languages/theme-light.css"
    else if (Application.UserPreferences.PresentationPreferences.ColorScheme === "light") themeStylesElement.href = "/design-languages/theme-light.css"
}

let designLanguageElement
let themeStylesElement
let pageStylesElement

function init() {
    // Check user last user preferences state if exist!
    let up = localStorage.getItem('UserPreferences')
    if (up) copyObject(JSON.parse(up), Application.UserPreferences)

    designLanguageElement = window.document.createElement("link")
    designLanguageElement.rel = "stylesheet"
    designLanguageElement.type = "text/css"
    window.document.head.appendChild(designLanguageElement)
    Application.LoadDesignLanguageStyles()

    // Load theme early to respect page styles!
    themeStylesElement = window.document.createElement('link')
    themeStylesElement.rel = "stylesheet"
    themeStylesElement.type = "text/css"
    window.document.head.appendChild(themeStylesElement)
    Application.LoadColorScheme()

    pageStylesElement = window.document.createElement("style")
    window.document.head.appendChild(pageStylesElement)

    Application.LoadFontFamilies()
}
init()

/**
 * https://webmasters.googleblog.com/2013/04/x-default-hreflang-for-international-pages.html
 * <link rel="alternate" href="http://example.com/" hreflang="x-default" />
 */
let defaultElement
/**
 * Store supported languages links to update in each URL changed.
 * https://support.google.com/webmasters/answer/189077?hl=en
 */
let supportedLanguagesHref = []

/**
 * Initialize method use to set||update app data so never change reference of Application to set||update data.
 * Function app parameter structure is Application object with as much as you want custom data!
 */
Application.Initialize = function (app) {
    Application = { ...Application, ...app }

    // Check and set Application.UserPreferences data like language and region in stateless manner if needed!
    if (Application.UserPreferences.ContentPreferences.Language.englishName === "") {
        Application.Polyfill.SuggestLanguage()
        // If above solution not work, use default application language
        if (Application.UserPreferences.ContentPreferences.Language.englishName === "") {
            Application.UserPreferences.ContentPreferences.Language = Application.ContentPreferences.Language
        }
    }
    if (Application.UserPreferences.ContentPreferences.Currency.nativeName === "") {
        Application.UserPreferences.ContentPreferences.Currency = Application.ContentPreferences.Currency
    }

    if (Application.UserPreferences.PresentationPreferences.DesignLanguage === "") {
        Application.UserPreferences.PresentationPreferences.DesignLanguage = Application.PresentationPreferences.DesignLanguage
    }
    if (Application.UserPreferences.PresentationPreferences.ColorScheme === "") {
        Application.UserPreferences.PresentationPreferences.ColorScheme = Application.PresentationPreferences.ColorScheme
    }
    if (Application.UserPreferences.PresentationPreferences.PrimaryFontFamily === "") {
        Application.UserPreferences.PresentationPreferences.PrimaryFontFamily = Application.PresentationPreferences.PrimaryFontFamily
    }

    Application.Localize()

    Application.Polyfill.PWA()
    Application.Polyfill.Meta()
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
 * Localize method use to set just locale data to app and pages Info
 * Call this method just after Application.Initialize() method.
 */
Application.Localize = function () {
    Application.LocaleInfo = Application.Info[Application.UserPreferences.ContentPreferences.Language.iso639_1]
    for (let key in Application.Pages) {
        let page = Application.Pages[key]
        page.LocaleInfo = page.Info[Application.UserPreferences.ContentPreferences.Language.iso639_1]
        page.LocaleText = page.Text[Application.UserPreferences.ContentPreferences.Language.iso639_1]
    }
    for (let key in Application.Widgets) {
        let widget = Application.Widgets[key]
        widget.LocaleText = widget.Text[Application.UserPreferences.ContentPreferences.Language.iso639_1]
    }
    for (let key in Application.Landings) {
        let landing = Application.Landings[key]
        landing.LocaleText = landing.Text[Application.UserPreferences.ContentPreferences.Language.iso639_1]
    }

    Application.Polyfill.SetLangAndDir()
    Application.Polyfill.SupportedLanguagesAlternateLink()
}

/** 
 * Router will route to requestedPageName and optional uri! and also add related page element to body!
 * @param {string} requestedPageName
 * @param {string} uri
 */
Application.Router = function (requestedPageName, uri) {
    // Tell others about new routing to do whatever they must do on url change!
    window.dispatchEvent(new Event('urlChanged'))

    const URI = new URL(uri || window.location.href)
    if (!requestedPageName || requestedPageName === "") requestedPageName = URI.pathname.split("/")[1]
    const recordID = URI.pathname.split("/")[2]

    // Warn active page about routing occur and do what it want to do!
    if (Application.ActivePage) Application.ActivePage.DisconnectedCallback()

    // Save previous page for any usage!
    Application.PreviousPage = Application.ActivePage

    // Find requested app!
    Application.ActivePage = Application.Pages[requestedPageName]
    if (!Application.ActivePage && requestedPageName === "landings" && recordID) {
        Application.ActivePage = Application.Landings[recordID]
    }
    if (!Application.ActivePage) {
        // Requested page not exist
        Application.Router("error-404", "")
        return
    }

    // Will remove when www.sabz.city ready to use
    if (Application.ActivePage.HTML === "") Application.Polyfill.LoadHtmlCSS(Application.ActivePage, requestedPageName === "landings")

    Application.ActivePage.PreviousURI = Application.ActivePage.ActiveURI
    Application.ActivePage.ActiveURI = URI

    // Check requested page support get RecordID!
    if (Application.ActivePage.RecordID === null && recordID !== undefined) {
        // Requested page not exist
        Application.Router("error-404", "")
        return
    }
    // Set page RecordID!
    Application.ActivePage.RecordID = recordID

    // Set page state same as hash in URLs!
    Application.ActivePage.State = URI.hash

    // Set page condition same as parameters in URLs! and check requested condition support by page!
    for (let sp of URI.searchParams.keys()) {
        // some application internal params
        if (sp === "hl" || sp === "utm_source" || sp === "utm_medium" || sp === "utm_campaign") continue

        if (Application.ActivePage.Condition[sp] === undefined) {
            if (Application.ActivePage.ID !== "error-404") {
                // Requested page not exist
                Application.Router("error-404", "")
                return
            }
            break
        } else if (Array.isArray(Application.ActivePage.Condition[sp])) {
            Application.ActivePage.Condition[sp] = URI.searchParams.getAll(sp)
        } else {
            Application.ActivePage.Condition[sp] = URI.searchParams.get(sp)
        }
    }

    // Update page title with page full name and update some meta tags!
    // This data also can be update in each page by ConnectedCallback method!
    window.document.title = Application.ActivePage.LocaleInfo.Name
    window.document.description.content = Application.ActivePage.LocaleInfo.Description
    window.document.robots.content = Application.ActivePage.Robots
    // Twitter card  https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started.html
    // The Open Graph protocol https://www.ogp.me/

    // Add page HTML & CSS to DOM
    pageStylesElement.innerHTML = Application.ActivePage.CSS
    Application.ActivePage.ConnectedCallback()
}

/**
 * Save method use to write active Application UserPreferences to browser localStorage.
 */
Application.Save = function () {
    localStorage.setItem('UserPreferences', JSON.stringify(Application.UserPreferences))
}


/**
 * Add some meta and link tag to header if user not install web app yet for not supported Application!!
 * This method can use just if you call Application.Localize() due we need some locale data!
 */
Application.Polyfill.PWA = function () {
    // Register service-worker.js
    // service-worker will be removed as soon as we can find other solution to control app by main function!
    if ('serviceWorker' in window.navigator) window.navigator.serviceWorker.register('/widget-localize/sw.js', { scope: "/" })

    if (window.matchMedia('(display-mode: browser)').matches) {
        // Warn users about console self attack.
        console.log('%cWARNING!', 'background:yellow; color:red; font-size:x-large')
        console.log(`%c\nUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand. \n`, 'font-size:large')
        // Attention developer to join SabzCity open source
        console.log('%cJoin SabzCity open source Platform: https://github.com/sabzcity', 'background:green;color:white;font-size:large')

        // Add icon
        const icon = document.createElement('link')
        icon.rel = "icon"
        icon.href = Application.Icon
        window.document.head.appendChild(icon)

        // Add iOS meta tags and icons
        const appleTitle = document.createElement('meta')
        appleTitle.name = "apple-mobile-web-app-title"
        appleTitle.content = Application.LocaleInfo.Name
        window.document.head.appendChild(appleTitle)

        const appleCapable = document.createElement('meta')
        appleCapable.name = "apple-mobile-web-app-capable"
        appleCapable.content = "yes"
        window.document.head.appendChild(appleCapable)

        const appleBarStyle = document.createElement('meta')
        appleBarStyle.name = "apple-mobile-web-app-status-bar-style"
        appleBarStyle.content = Application.PresentationPreferences.ThemeColor
        window.document.head.appendChild(appleBarStyle)

        const appleIcon = document.createElement('link')
        appleIcon.rel = "apple-touch-icon"
        appleIcon.href = Application.Icon
        window.document.head.appendChild(appleIcon)

        // Add Chrome meta tags and icons
        const appName = document.createElement('meta')
        appName.name = "application-name"
        appName.content = Application.LocaleInfo.Name
        window.document.head.appendChild(appName)

        const appCapable = document.createElement('meta')
        appCapable.name = "mobile-web-app-capable"
        appCapable.content = "yes"
        window.document.head.appendChild(appCapable)

        const appTheme = document.createElement('meta')
        appTheme.name = "theme-color"
        appTheme.content = Application.PresentationPreferences.ThemeColor
        window.document.head.appendChild(appTheme)

        // Add WebManifest
        const manifest = document.createElement('link')
        manifest.rel = "manifest"
        manifest.href = "data:application/manifest+json," + JSON.stringify({
            name: Application.LocaleInfo.Name,
            short_name: Application.LocaleInfo.ShortName,
            description: Application.LocaleInfo.Description,
            // theme_color: Application.PresentationPreferences.ThemeColor,
            display: Application.PresentationPreferences.Display,
            orientation: Application.PresentationPreferences.Orientation,
            start_url: window.location.origin + "/" + Application.HomePage + "?utm_source=PWA&utm_medium=homescreen",
            icons: [{ "sizes": "512x512", "type": "image/png", src: window.location.origin + Application.Icon }],
        })
        window.document.head.appendChild(manifest)
    }
}

Application.Polyfill.Meta = function () {
    // If description meta tag is important why it doesn't have document object like title!!?
    // We add it here to update it content later dynamically on every page.
    window.document.description = document.createElement('meta')
    window.document.description.name = "description"
    window.document.head.appendChild(window.document.description)

    // Due to application is CSR (Client side rendering) we need to control robot to allow||disallow indexing
    // - Prevent some pages to index
    // - we can't change status code to 404
    // https://developers.google.com/search/reference/robots_meta_tag
    window.document.robots = document.createElement('meta')
    window.document.robots.name = "robots"
    window.document.head.appendChild(window.document.robots)
}

/**
 * Set language and region from Application.UserPreferences to html tag of DOM!
 * Call it each time language or region changed
 */
Application.Polyfill.SetLangAndDir = function () {
    // change <html lang="en" dir="ltr"> in language change
    window.document.documentElement.lang = Application.UserPreferences.ContentPreferences.Language.iso639_1 + "-" + Application.UserPreferences.ContentPreferences.Region.iso3166_1_a2
    window.document.dir = Application.UserPreferences.ContentPreferences.Language.dir
}

/**
 * Add supported languages alternate link to header and update href on every url changed!
 */
Application.Polyfill.SupportedLanguagesAlternateLink = function () {
    if (Application.ContentPreferences.Languages.length > 1) {
        // Add app supported languages links to header without href attributes!
        defaultElement = window.document.createElement('link')
        defaultElement.rel = "alternate"
        defaultElement.hreflang = "x-default"
        window.document.head.appendChild(defaultElement)

        for (let l of Application.ContentPreferences.Languages) {
            const element = window.document.createElement('link')
            element.rel = "alternate"
            element.hreflang = l
            window.document.head.appendChild(element)
            supportedLanguagesHref.push(element)
        }

        // Update href attributes on url changed
        window.addEventListener('urlChanged', hrefAlternateListener, false)
    }
}

function hrefAlternateListener(event) {
    const url = new URL(window.location.href)
    for (let slh of supportedLanguagesHref) {
        url.searchParams.set('hl', slh.hreflang)
        slh.href = url
    }

    url.searchParams.delete('hl')
    defaultElement.href = url
}

Application.Polyfill.SuggestLanguage = function () {
    // Check if language be in URL (hl parameter)
    let hl = new URL(window.location.href).searchParams.get('hl')
    if (hl && Application.ContentPreferences.Languages.includes(hl.split("-")[0])) {
        hl = hl.split("-")
        Application.UserPreferences.ContentPreferences.Language = Languages.find(l => l.iso639_1 === hl[0])
        if (hl[1]) Application.UserPreferences.ContentPreferences.Region = Regions.find(r => r.iso3166_1_a2 === hl[1])
    }
    // Check browser languages list!
    else {
        window.navigator.languages.some(l => {
            hl = l.split("-")
            if (hl[0] !== "" && Application.ContentPreferences.Languages.includes(hl[0])) {
                Application.UserPreferences.ContentPreferences.Language = Languages.find(l => l.iso639_1 === hl[0])
                if (hl[1]) Application.UserPreferences.ContentPreferences.Region.iso3166_1_a2 = Regions.find(r => r.iso3166_1_a2 === hl[1])
            }
        })
    }

    // Suggest language by user IP!
    import('/widget-localize/widget-suggest-language.js').then(
        window.document.documentElement.insertBefore(window.document.createElement("widget-suggest-language"), window.document.body)
    )
}

/**
 * lazy load pages files! It will just use until dedicated web server(www.sabz.city repo) ready to use!
 */
Application.Polyfill.LoadHtmlCSS = function (page, landings) {
    const xhr = new XMLHttpRequest()

    let location = "/pages/page-"
    if (landings) location = "/landings/landing-"

    for (let tem in page.Templates) {
        xhr.open("GET", location + page.ID + "-template-" + tem + ".html", false)
        xhr.send(null)
        if (xhr.status === 200) {
            page.Templates[tem] = xhr.responseText
        }
    }

    xhr.open("GET", location + page.ID + ".html", false)
    xhr.send(null)
    if (xhr.status === 200) {
        page.HTML = xhr.responseText
    }

    xhr.open("GET", location + page.ID + ".css", false)
    xhr.send(null)
    if (xhr.status === 200) {
        page.CSS = xhr.responseText
    }
}

/**
 * 
 * Listeners
 * 
 */
function clickListener(event) {
    if (event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey) return

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
    Application.Router("", goUrl.href)
}
window.addEventListener('click', clickListener, false)

function stateChangeListener(event) {
    // prevent the default navigate
    event.preventDefault()

    // Do routing instead of reload page!
    Application.Router("", window.location.href)
}
window.addEventListener('popstate', stateChangeListener, false)
window.addEventListener('pushState', stateChangeListener, false)

// Save UserPreferences on user exit app!
window.addEventListener('beforeunload', Application.Save, false)
