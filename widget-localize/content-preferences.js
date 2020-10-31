/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'
import { Languages } from '../languages.js'
import { Regions } from '../regions.js'
import { Currencies } from '../currencies.js'

// https://tools.ietf.org/html/bcp47
widgets["content-preferences"] = {
    ID: "content-preferences",
    HTML: () => ``,
    CSS: '',
    Templates: {}
}

widgets["content-preferences"].ConnectedCallback = function () {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

widgets["content-preferences"].DisconnectedCallback = function () {
}

function contentWidgetChangeLanguage(langInput) {
    // const langInput = this.shadowRoot.getElementById("language")
    const lang = Languages.find(l => l.nativeName === langInput)
    if (lang && Application.ContentPreferences.Languages.includes(lang.iso639_1)) {
        Application.UserPreferences.ContentPreferences.Language = lang
        // langInput.setCustomValidity("")
    } else {
        // alert user about not supported or bad language selected
        // langInput.setCustomValidity(langInput.getAttribute("validationMessage"))
    }
}

function contentWidgetChangeRegion(regionInput) {
    // const regionInput = this.shadowRoot.getElementById("region")
    const region = Regions.find(r => r.nativeName === regionInput.value)
    if (region) {
        Application.UserPreferences.ContentPreferences.Region = region
        // regionInput.setCustomValidity("")
    } else {
        // alert user about not supported or bad region selected
        // regionInput.setCustomValidity(regionInput.getAttribute("validationMessage"))
    }
}

function contentWidgetChangeCurrency(currencyInput) {
    // const currencyInput = this.shadowRoot.getElementById("currency")
    const currency = Currencies.find(c => c.nativeName === currencyInput.value)
    if (currency) {
        Application.UserPreferences.ContentPreferences.Currency = currency
        // currencyInput.setCustomValidity("")
    } else {
        // alert user about not supported or bad region selected
        // currencyInput.setCustomValidity(currencyInput.getAttribute("validationMessage"))
    }
}
