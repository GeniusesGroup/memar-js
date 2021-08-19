/* For license and copyright information please see LEGAL file in repository */

import './languages.js'
import '../polyfills/url.js'
import '../widget-localize/suggest-language.js'

const language = {
    poolByID: {},
    poolByISO639_1: {},
    poolByNativeName: {},
}

// function init() {
for (let l of language.Languages) {
    language.poolByID[l.ID] = l
    language.poolByISO639_1[l.iso639_1] = l
    language.poolByNativeName[l.nativeName] = l
}
// }

/**
 * returns native name of given language ID
 * @param {number} langID 
 */
language.String = function (langID) {
    return this.poolByID[langID].nativeName
}

/**
 * return all data about given language ID
 * @param {number} langID 
 */
language.GetByID = function (langID) {
    return this.poolByID[langID]
}

language.GetByNativeName = function (nativeName) {
    return this.poolByNativeName[nativeName]
}

language.GetSupportedByNativeName = function (nativeName) {
    const lang = this.poolByNativeName[nativeName]
    if (!lang) return null
    if (!Application.ContentPreferences.Languages.includes(lang.iso639_1)) return null
    return lang
}

language.GetAllAsOptions = function () {
    let options = ""
    for (let l of this.Languages) {
        options += `<option value="${l.nativeName}">${l.englishName}</option>`
    }
    return options
}

language.GetAppSupportedAsOptions = function () {
    let options = ""
    for (let l of this.Languages) {
        if (!Application.ContentPreferences.Languages.includes(l.iso639_1)) continue
        options += `<option value="${l.nativeName}">${l.englishName}</option>`
    }
    return options
}

/**
 * Set language and region from OS.User to html tag of DOM!
 * Call it each time language or region changed
 */
language.SetLangAndDir = function () {
    // change <html lang="en" dir="ltr"> in language change
    window.document.documentElement.lang = OS.User.ContentPreferences.Language.iso639_1
    if (!!OS.User.ContentPreferences.Region.iso3166_1_a2) window.document.documentElement.lang += "-" + OS.User.ContentPreferences.Region.iso3166_1_a2
    window.document.dir = OS.User.ContentPreferences.Language.dir
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
language.SupportedLanguagesAlternateLink = function () {
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

        // Update href attributes on page changed
        window.addEventListener('stateChanged', hrefAlternateListener, false)
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

language.SuggestLanguage = function () {
    // Check if language be in URL (hl parameter)
    const urlLangReg = window.location.GetLanguageRegion()
    if (urlLangReg.l !== "" && Application.ContentPreferences.Languages.includes(urlLangReg.l)) {
        OS.User.ContentPreferences.Language = language.poolByISO639_1[urlLangReg.l]
        if (urlLangReg.r) OS.User.ContentPreferences.Region = region.poolByISO3166_1_a2[urlLangReg.r]
    }
    // TODO::: use browser language not good before suggest by IP!
    // Check browser languages list!
    // else {
    //     for (let lang of window.navigator.languages) {
    //         const hlParts = lang.split("-")
    //         if (hlParts[0] !== "" && Application.ContentPreferences.Languages.includes(hlParts[0])) {
    //             OS.User.ContentPreferences.Language = language.poolByISO639_1[hlParts[0]]
    //             if (hlParts[1]) OS.User.ContentPreferences.Region.iso3166_1_a2 = region.poolByISO3166_1_a2[hlParts[1]]
    //             break
    //         }
    //     }
    // }

    // Suggest language by user IP!
    suggestLanguageWidget.ConnectedCallback()
}
