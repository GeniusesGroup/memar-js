/* For license and copyright information please see LEGAL file in repository */

import './polyfill.js'
import './users.js'
import './pages.js'
import './thing.js'
import './language.js'
import './region.js'
import './price/currency.js'

/**
 * Experimental "Application" objects use to expand default browser window object!
 * Application default data just use if user have not distinction yet otherwise user defaults in users.active will used!
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
Application.Start = function () {
    Application.ContentPreferences.Language = language.poolByISO639_1[Application.ContentPreferences.Languages[0]]
    Application.ContentPreferences.Region = region.poolByISO3166_1_a3[Application.ContentPreferences.Regions[0]]
    Application.ContentPreferences.Currency = currency.poolByISO4217[Application.ContentPreferences.Currencies[0]]

    thing.init()
    const firstTime = users.LoadState()

    Application.LoadDesignLanguageStyles()
    Application.LoadColorScheme()
    Application.LoadFontFamilies()

    const initScript = document.createElement('script')
    initScript.src = "/init-" + users.active.ContentPreferences.Language.iso639_1 + ".js"
    document.head.appendChild(initScript)
    initScript.onload = function () {

        Polyfill.SetLangAndDir()
        Polyfill.PWA()
        Polyfill.Meta()

        if (firstTime) {
            Polyfill.SupportedLanguagesAlternateLink()
            Polyfill.SuggestLanguage()
            pages.Router({}, window.location.href)
        } else {
            // First check user preference in PWA version
            if (!(window.matchMedia('(display-mode: browser)').matches) && window.location.pathname === "/") {
                window.history.replaceState({}, "", "/" + users.active.HomePage)
                pages.Router({ ID: users.active.HomePage }, "")
            } else {
                // Do normal routing!
                pages.Router({}, window.location.href)
            }
        }
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
    if (users.active.PresentationPreferences.DesignLanguage === "material") {
        Application.DesignLanguageStyles = "/design-language--material.css"
        designLanguageElement.href = Application.DesignLanguageStyles
        // Load related icon font family
        // https://fonts.googleapis.com/icon?family=Material+Icons
        const iconsFont = new FontFace('Material Icons', 'url(https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2)');
        iconsFont.load()
        window.document.fonts.add(iconsFont)
    } else if (users.active.PresentationPreferences.DesignLanguage === "flat") Application.DesignLanguageStyles = "/design-language--flat.css"
    else if (users.active.PresentationPreferences.DesignLanguage === "fluent") Application.DesignLanguageStyles = "/design-language--fluent.css"
    else if (users.active.PresentationPreferences.DesignLanguage === "ant") Application.DesignLanguageStyles = "/design-language--ant.css"
}

/**
 * Load active font families by their names in user preferences!
 */
Application.LoadFontFamilies = function () {
    if (users.active.PresentationPreferences.PrimaryFontFamily === "Roboto") {
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
    if (users.active.PresentationPreferences.ColorScheme === "no-preference") {
        // get browser or OS preference
        themeStylesElement.href = "/theme-light.css"
    }
    else if (users.active.PresentationPreferences.ColorScheme === "dark") themeStylesElement.href = "/theme-light.css"
    else if (users.active.PresentationPreferences.ColorScheme === "light") themeStylesElement.href = "/theme-light.css"
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
