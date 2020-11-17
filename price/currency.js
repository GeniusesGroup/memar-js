/* For license and copyright information please see LEGAL file in repository */

const currency = {
    poolByISO4217_num: {},
    poolByISO4217: {},
    poolByNativeName: {},
}

/**
 * 
 * @param {number} num 
 * @param {number} iso4217_num 
 */
currency.String = function (num, iso4217_num) {
    if (!num) num = 0
    if (iso4217_num) return num.toLocaleString() + " " + this.poolByISO4217_num[iso4217_num].symbol

    // TODO::: convert iso4217_num if not same as user wanted!
    return num.toLocaleString() + " " + users.active.ContentPreferences.Currency.symbol
}

currency.GetByNativeName = function (nativeName) {
    return this.poolByNativeName[nativeName]
}

currency.GetSupportedByNativeName = function (nativeName) {
    const cur = this.poolByNativeName[nativeName]
    if (!cur) return null
    if (!Application.ContentPreferences.Currencies.includes(cur.iso4217)) return null
    return cur
}

currency.GetAllAsOptions = function () {
    let options = ""
    for (let c of this.currencies) {
        options += `<option value="${c.nativeName}">${c.englishName}</option>`
    }
    return options
}

currency.GetAppSupportedAsOptions = function () {
    let options = ""
    for (let c of this.currencies) {
        if (!Application.ContentPreferences.Currencies.includes(c.iso4217)) continue
        options += `<option value="${c.nativeName}">${c.englishName}</option>`
    }
    return options
}

// https://en.wikipedia.org/wiki/ISO_4217
currency.currencies = [
    {
        englishName: "Persia Derik",
        nativeName: "Persia Derik",
        iso4217: "PRD",
        iso4217_num: 7337,
        symbol: "D",
    }, {
        englishName: "Iranian rial",
        nativeName: "ریال ایران",
        iso4217: "IRR",
        iso4217_num: 364,
        symbol: "ريال",
    }, {
        englishName: "Iranian toman",
        nativeName: "تومان ایران‎",
        iso4217: "IRT",
        iso4217_num: 0,
        symbol: "تومان‎",
    }, {
        englishName: "Euro",
        nativeName: "Euro",
        iso4217: "EUR",
        iso4217_num: 978,
        symbol: "€",
    }, {
        englishName: "United Arab Emirates dirham",
        nativeName: "درهم إماراتي",
        iso4217: "AED",
        iso4217_num: 784,
        symbol: "د.إ",
    }, {
        englishName: "United States Dollar",
        nativeName: "United States Dollar",
        iso4217: "USD",
        iso4217_num: 840,
        symbol: "$",
    },
]

// function init() {
for (let c of currency.currencies) {
    currency.poolByISO4217_num[c.iso4217_num] = c
    currency.poolByISO4217[c.iso4217] = c
    currency.poolByNativeName[c.nativeName] = c
}
// }