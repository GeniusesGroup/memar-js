/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'
import '../language.js'
import '../region.js'
import '../price/currency.js'
import '../users.js'

/**
 * 
 * https://tools.ietf.org/html/bcp47
 */
const contentPreferencesWidget = {
    ID: "content-preferences",
    HTML: () => ``,
    CSS: '',
    Templates: {}
}
widgets.poolByID[contentPreferencesWidget.ID] = contentPreferencesWidget

contentPreferencesWidget.ConnectedCallback = function () {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

contentPreferencesWidget.DisconnectedCallback = function () {
}

contentPreferencesWidget.ChangeLanguage = function(element) {
    const lang = language.GetSupportedByNativeName(element.value)
    if (lang) {
        users.active.ContentPreferences.Languages = [lang.iso639_1]
        users.active.ContentPreferences.Language = lang
        element.setCustomValidity("")
        element.reportValidity()
    } else {
        // alert user about not supported or bad region selected
        element.setCustomValidity(element.getAttribute("validationMessage"))
        element.reportValidity()
    }
}

contentPreferencesWidget.ChangeRegion = function(element) {
    const reg = region.GetSupportedByNativeName(element.value)
    if (reg) {
        users.active.ContentPreferences.Regions = [reg.iso3166_1_a3]
        users.active.ContentPreferences.Region = reg
        element.setCustomValidity("")
        element.reportValidity()
    } else {
        // alert user about not supported or bad region selected
        element.setCustomValidity(element.getAttribute("validationMessage"))
        element.reportValidity()
    }
}

contentPreferencesWidget.ChangeCurrency = function(element) {
    const cur = currency.GetSupportedByNativeName(element.value)
    if (cur) {
        users.active.ContentPreferences.Regions = [cur.iso4217]
        users.active.ContentPreferences.Currency = cur
        element.setCustomValidity("")
        element.reportValidity()
    } else {
        // alert user about not supported or bad currency selected
        element.setCustomValidity(element.getAttribute("validationMessage"))
        element.reportValidity()
    }
}
