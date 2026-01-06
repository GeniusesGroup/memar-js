/* For license and copyright information please see LEGAL file in repository */

import '../language/language.js'
import '../region/region.js'
import '../price/currency.js'

/**
 * 
 * https://tools.ietf.org/html/bcp47
 */
const contentPreferencesWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "content-preferences",
    },
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {},
}
Application.RegisterWidget(contentPreferencesWidget)

contentPreferencesWidget.ConnectedCallback = function () {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

contentPreferencesWidget.DisconnectedCallback = function () {
}

contentPreferencesWidget.ChangeLanguage = function (element) {
    const lang = language.GetSupportedByNativeName(element.value)
    if (lang) {
        OS.User.ContentPreferences.Languages = [lang.iso639_1]
        OS.User.ContentPreferences.Language = lang
        element.warnValidity("")
        element.focusNext()
    } else {
        element.warnValidity()
        return
    }
}

contentPreferencesWidget.ChangeRegion = function (element) {
    const reg = region.GetSupportedByNativeName(element.value)
    if (reg) {
        OS.User.ContentPreferences.Regions = [reg.iso3166_1_a3]
        OS.User.ContentPreferences.Region = reg
        element.warnValidity("")
        element.focusNext()
    } else {
        element.warnValidity()
        return
    }
}

contentPreferencesWidget.ChangeCurrency = function (element) {
    const cur = currency.GetSupportedByNativeName(element.value)
    if (cur) {
        OS.User.ContentPreferences.Currency = [cur.iso4217]
        OS.User.ContentPreferences.Currency = cur
        element.warnValidity("")
        element.focusNext()
    } else {
        element.warnValidity()
        return
    }
}

contentPreferencesWidget.currencyWidgetCallback = function (cur) {
    OS.User.ContentPreferences.Currency = [cur.iso4217]
    OS.User.ContentPreferences.Currency = cur
}

contentPreferencesWidget.Options.CurrencySelect = {
    identifier: "contentPreferencesWidget.Options.CurrencySelect",
    callback: contentPreferencesWidget.currencyWidgetCallback,
    appSupported: true,
}
