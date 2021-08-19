/* For license and copyright information please see LEGAL file in repository */

import './pages.js'
import './history.js'
import './widgets.js'
import '../region.js'
import '../os/os.js'
import '../polyfills/audio.js'
import '../polyfills/button.js'
import '../polyfills/dialog.js'
import '../polyfills/element.js'
import '../polyfills/meta.js'
import '../language/language.js'
import '../price/currency.js'

/**
 * Experimental "Application" objects use to expand default browser window object!
 * Application default data just use if user have not distinction yet otherwise user defaults in OS.User will used!
 */
const Application = {
    Icon: "", // Image location
    // !! Security Warning !! app name and icon must have approved mechanism with domain register process!!
    Info: { Name: "", ShortName: "", Tagline: "", Slogan: "", Description: "", Tags: [] },
    ContentPreferences: {  // HTML Preferences
        Languages: [], // Supported languages by app in In iso639_1 format. First one is default.
        Language: {},
        Currencies: [], // Supported currencies by app In ISO_4217. First one is default.
        Currency: {},
        Regions: [],  // Supported currencies by app In iso3166_1_a3. First one is default.
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

    DesignLanguageStyles: "", // Link element, Add auto by Application.LoadDesignLanguageStyles() method
    PrimaryFont: null, // FontFace(), Add auto by Application.LoadFontFamilies() method
    SecondaryFont: null, // FontFace(), Add auto by Application.LoadFontFamilies() method
}

/**
 * Start the application
 */
Application.Start = async function () {
    await OS.Init()

    Application.ContentPreferences.Language = language.poolByISO639_1[Application.ContentPreferences.Languages[0]]
    Application.ContentPreferences.Region = region.poolByISO3166_1_a3[Application.ContentPreferences.Regions[0]]
    Application.ContentPreferences.Currency = currency.poolByISO4217[Application.ContentPreferences.Currencies[0]]

    Application.LoadDesignLanguageStyles()
    Application.LoadColorScheme()
    Application.LoadFontFamilies()

    // First check user preference in PWA version
    if (!(window.matchMedia('(display-mode: browser)').matches) && window.location.pathname === "/") {
        window.history.replaceState({}, "", "/" + OS.User.HomePage)
        this.ActivatePage(Application.GetPageByURNName(OS.User.HomePage), null)
    } else {
        // Do normal routing!
        this.ActivatePageByURL(window.location.href)
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
    if (OS.User.PresentationPreferences.DesignLanguage === "material") {
        Application.DesignLanguageStyles = "/design-language--material.css"
        designLanguageElement.href = Application.DesignLanguageStyles
        // Load related icon font family
        // https://fonts.googleapis.com/icon?family=Material+Icons
        const iconsFont = new FontFace('Material Icons', 'url(https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)');
        iconsFont.load()
        window.document.fonts.add(iconsFont)
    } else if (OS.User.PresentationPreferences.DesignLanguage === "flat") Application.DesignLanguageStyles = "/design-language--flat.css"
    else if (OS.User.PresentationPreferences.DesignLanguage === "fluent") Application.DesignLanguageStyles = "/design-language--fluent.css"
    else if (OS.User.PresentationPreferences.DesignLanguage === "ant") Application.DesignLanguageStyles = "/design-language--ant.css"
}

/**
 * Load active font families by their names in user preferences!
 */
Application.LoadFontFamilies = function () {
    if (OS.User.PresentationPreferences.PrimaryFontFamily === "Roboto") {
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
    if (OS.User.PresentationPreferences.ColorScheme === "no-preference") {
        // get browser or OS preference
        themeStylesElement.href = "/theme-light.css"
    }
    else if (OS.User.PresentationPreferences.ColorScheme === "dark") themeStylesElement.href = "/theme-light.css"
    else if (OS.User.PresentationPreferences.ColorScheme === "light") themeStylesElement.href = "/theme-light.css"
}

/**
 * before exit app do some checks and write some states!
 */
window.onbeforeunload = async function (event) {
    // Warn active page about close||refresh occur and do what it want to do!
    if (Application.pages.activePage) {
        const leave = await Application.pages.activePage.DisconnectedCallback()
        if (leave === false) {
            event.preventDefault()
            return
        }
    }
    OS.Shutdown()
}
