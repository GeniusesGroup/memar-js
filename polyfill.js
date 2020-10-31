/* For license and copyright information please see LEGAL file in repository */

import './languages.js'
import './regions.js'
import './currencies.js'
import './widget-localize/suggest-language.js'

/**
 * Experimental "Polyfill" objects use to expand default browser window object!
 */
const Polyfill = {}

/**
 * Add some meta and link tag to header if user not install web app yet for not supported Application!!
 */
Polyfill.PWA = function () {
    // Register service-worker.js
    // service-worker will be removed as soon as we can find other solution to control app by main function!
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: "/" })
            .then(reg => {
                reg.onupdatefound = function () { location.reload() } // TODO::: promote a dialog to user to update app by click update!
            })
    }

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
        appleTitle.content = Application.Info.Name
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
        appName.content = Application.Info.Name
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
        const manifest = {
            name: Application.Info.Name,
            short_name: Application.Info.ShortName,
            description: Application.Info.Description,
            // theme_color: Application.PresentationPreferences.ThemeColor,
            display: Application.PresentationPreferences.Display,
            orientation: Application.PresentationPreferences.Orientation,
            start_url: window.location.origin + "/" + Application.UserPreferences.HomePage + "?utm_source=PWA&utm_medium=HomeScreen",
            icons: [{ "sizes": "512x512", "type": "image/png", src: window.location.origin + "/" + Application.Icon }],
            shortcuts: [],
        }
        for (page of Application.MostUsedPages) {
            manifest.shortcuts.push({
                "name": Application.Pages[page].Info.Name,
                "url": window.location.origin + "/" + Application.Pages[page].ID,
                "description": Application.Pages[page].Info.Description,
            })
        }
        const manifestElement = document.createElement('link')
        manifestElement.rel = "manifest"
        manifestElement.href = "data:application/manifest+json," + JSON.stringify(manifest)
        window.document.head.appendChild(manifestElement)
    }
}

Polyfill.Meta = function () {
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
Polyfill.SetLangAndDir = function () {
    // change <html lang="en" dir="ltr"> in language change
    window.document.documentElement.lang = Application.UserPreferences.ContentPreferences.Language.iso639_1
    if (Application.UserPreferences.ContentPreferences.Region.iso3166_1_a2 !== "") window.document.documentElement.lang += "-" + Application.UserPreferences.ContentPreferences.Region.iso3166_1_a2
    window.document.dir = Application.UserPreferences.ContentPreferences.Language.dir
}

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
 * Add supported languages alternate link to header and update href on every url changed!
 */
Polyfill.SupportedLanguagesAlternateLink = function () {
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

Polyfill.GetLangRegFromURL = function () {
    const hl = new URLSearchParams(window.location.search).get('hl')
    let hlParts = ["", ""]
    if (hl) hlParts = hl.split("-")
    return {
        l: hlParts[0],
        r: hlParts[1]
    }
}

Polyfill.SuggestLanguage = function () {
    // Check if language be in URL (hl parameter)
    const urlLangReg = Polyfill.GetLangRegFromURL()
    if (urlLangReg.l !== "" && Application.ContentPreferences.Languages.includes(urlLangReg.l)) {
        Application.UserPreferences.ContentPreferences.Language = Languages.find(l => l.iso639_1 === urlLangReg.l)
        if (urlLangReg.r) Application.UserPreferences.ContentPreferences.Region = Regions.find(r => r.iso3166_1_a2 === urlLangReg.r)
    }
    // Check browser languages list!
    else {
        for (let lang of window.navigator.languages) {
            const hlParts = lang.split("-")
            if (hlParts[0] !== "" && Application.ContentPreferences.Languages.includes(hlParts[0])) {
                Application.UserPreferences.ContentPreferences.Language = Languages.find(l => l.iso639_1 === hlParts[0])
                if (hlParts[1]) Application.UserPreferences.ContentPreferences.Region.iso3166_1_a2 = Regions.find(r => r.iso3166_1_a2 === hlParts[1])
                break
            }
        }
    }

    // Suggest language by user IP!
    widgets["suggest-language"].ConnectedCallback()
}
