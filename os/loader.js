/* For license and copyright information please see LEGAL file in repository */

import '../time.js'

// https://en.wikipedia.org/wiki/Loader_(computing)
OS.loader = {
    name: "",
}

OS.LoaderName = function () { return OS.loader.name }

/**
 * loadApp will load needed files to start the application!
 */
OS.loader.loadApp = async function () {
    const initScript = document.createElement('script')
    initScript.src = "/init-" + OS.User.ContentPreferences.Language.iso639_1 + ".js"
    initScript.onload = initOnLoad
    document.head.appendChild(initScript)
    return new Promise((resolve, reject) => {
        this.resolver = resolve
        this.rejecter = reject
    })
}

OS.loader.initOnLoad = function (event) {
    this.resolver(true)
}

OS.loader.SuggestUpgrade = function () {
    if (!('serviceWorker' in navigator)
        || (typeof HTMLDialogElement === 'undefined')
        || (typeof Storage === "undefined")
        || (typeof RTCPeerConnection === 'undefined')
        || !window.indexedDB
        || !('mediaDevices' in navigator)) {

        popUpNotificationWidget.New(
            "BAD BROWSER!!!!!!",
            "You use '" + this.Name() + "' that it can cause serious problem while use this platform! We suggest use latest chrome version",
            popUpNotificationWidgetTypeError
        )
        // centerNotificationWidget.New("LocaleText[54]", "LocaleText[55]", centerNotificationWidgetTypeError)
    }
}

OS.loader.detectName = function () {
    let ua = navigator.userAgent.toLowerCase()
    let regExpMatchArray

    if (regExpMatchArray = ua.match(/msie ([\d.]+)/)) this.name = 'IE: ' + regExpMatchArray[1]
    else if (regExpMatchArray = ua.match(/firefox\/([\d.]+)/)) this.name = 'Firefox: ' + regExpMatchArray[1]
    else if (regExpMatchArray = ua.match(/chrome\/([\d.]+)/)) this.name = 'Chrome: ' + regExpMatchArray[1]
    else if (regExpMatchArray = ua.match(/opera.([\d.]+)/)) this.name = 'Opera: ' + regExpMatchArray[1]
    else if (regExpMatchArray = ua.match(/version\/([\d.]+).*safari/)) this.name = 'Safari: ' + regExpMatchArray[1]
}

/**
 * Add some meta and link tag to header if user not install web app yet for not supported Application!!
 */
OS.loader.PWA = function () {
    // Register service-worker.js
    // service-worker will be removed as soon as we can find other solution to control app by main function!
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: "/" })
            .then(reg => {
                reg.onupdatefound = async function () {
                    // TODO::: promote a dialog to user to update app by click update!
                    await time.Sleep(1000)
                    location.reload()
                }
            })
    }

    if (window.matchMedia('(display-mode: browser)').matches) this.UpdateManifest()
}

/**
 * Add some meta and link tag to header of dom!
 */
OS.loader.UpdateManifest = function () {
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
        start_url: window.location.origin + "/" + OS.User.HomePage + "?utm_source=PWA&utm_medium=HomeScreen",
        icons: [{ "sizes": "512x512", "type": "image/png", src: window.location.origin + "/" + Application.Icon }],
        shortcuts: [],
    }
    for (let pageID of Application.MostUsedPages) {
        manifest.shortcuts.push({
            "name": Application.GetPageByURNName(pageID).Info.Name,
            "url": window.location.origin + "/" + Application.GetPageByURNName(pageID).ID,
            "description": Application.GetPageByURNName(pageID).Info.Description,
        })
    }
    const manifestElement = document.createElement('link')
    manifestElement.rel = "manifest"
    manifestElement.href = "data:application/manifest+json," + JSON.stringify(manifest)
    window.document.head.appendChild(manifestElement)
}
