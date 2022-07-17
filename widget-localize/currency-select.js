/* For license and copyright information please see LEGAL file in repository */

import '../price/currency.js'

const CurrencySelectWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "currency-select",
    },
    Conditions: {},
    HTML: (options) => ``,
    CSS: '',
}
Application.RegisterWidget(CurrencySelectWidget)

CurrencySelectWidget.ConnectedCallback = function (options) {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return CurrencySelectWidget.HTML(options)
}

CurrencySelectWidget.DisconnectedCallback = function () { }

CurrencySelectWidget.onKeyDownInputElement = function (element, optionsIdentifier) {
    if (event.keyCode === 13) { // event.key === 'Enter'
        let cur
        if (optionsIdentifier.appSupported) {
            cur = currency.GetSupportedByNativeName(element.value)
        } else {
            cur = currency.GetByNativeName(element.value)
        }
        if (cur) {
            optionsIdentifier.callback(cur)
            element.warnValidity("")
            element.focusNext()
            localStorage.setItem('LastCurrencyInCurrencySelectWidget', cur.ID)
        } else {
            element.warnValidity()
            return
        }
    }
}

CurrencySelectWidget.onChangeInputElement = function (element, optionsIdentifier) {
    let cur
    if (optionsIdentifier.appSupported) {
        cur = currency.GetSupportedByNativeName(element.value)
    } else {
        cur = currency.GetByNativeName(element.value)
    }
    if (cur) {
        optionsIdentifier.callback(cur)
        element.warnValidity("")
        element.focusNext()
        localStorage.setItem('LastCurrencyInCurrencySelectWidget', cur.ID)
    } else {
        element.warnValidity()
        return
    }
}

CurrencySelectWidget.GetAllAsOptions = function () {
    if (!this.allOptions) {
        this.allOptions = ""
        for (let c of currency.currencies) {
            this.allOptions += `<option value="${c.nativeName}">${c.englishName}</option>`
        }
    }
    return this.allOptions
}

CurrencySelectWidget.GetAppSupportedAsOptions = function () {
    if (!this.supportedOptions) {
        this.supportedOptions = ""
        for (let c of currency.currencies) {
            if (!Application.ContentPreferences.Currencies.includes(c.iso4217)) continue
            this.supportedOptions += `<option value="${c.nativeName}">${c.englishName}</option>`
        }
    }
    return this.supportedOptions
}