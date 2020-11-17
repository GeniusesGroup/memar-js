/* For license and copyright information please see LEGAL file in repository */

const language = {
    poolByID: {},
    poolByISO639_1: {},
    poolByNativeName: {},
}

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

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
language.Languages = [
    {
        englishName: "Arabic",
        nativeName: "العربية",
        iso639_1: "ar",
        iso639_2T: "ara",
        iso639_2B: "ara",
        iso639_3: "ara",
        dir: "rtl",
        id: 3,
    }, {
        englishName: "Chinese",
        nativeName: "中文",
        iso639_1: "zh",
        iso639_2T: "zho",
        iso639_2B: "chi",
        iso639_3: "zho",
        dir: "ltr"
    }, {
        englishName: "English",
        nativeName: "English",
        iso639_1: "en",
        iso639_2T: "eng",
        iso639_2B: "eng",
        iso639_3: "eng",
        dir: "ltr",
        id: 0,
    }, {
        englishName: "French",
        nativeName: "français",
        iso639_1: "fr",
        iso639_2T: "fra",
        iso639_2B: "fre",
        iso639_3: "fra",
        dir: "ltr"
    }, {
        englishName: "German",
        nativeName: "Deutsch",
        iso639_1: "de",
        iso639_2T: "deu",
        iso639_2B: "ger",
        iso639_3: "deu",
        dir: "ltr"
    }, {
        englishName: "Hindi",
        nativeName: "हिन्दी",
        iso639_1: "hi",
        iso639_2T: "hin",
        iso639_2B: "hin",
        iso639_3: "hin",
        dir: "ltr"
    }, {
        englishName: "Persian",
        nativeName: "فارسی",
        iso639_1: "fa",
        iso639_2T: "fas",
        iso639_2B: "per",
        iso639_3: "fas",
        dir: "rtl",
        id: 1,
    }, {
        englishName: "Russian",
        nativeName: "русский",
        iso639_1: "ru",
        iso639_2T: "rus",
        iso639_2B: "rus",
        iso639_3: "rus",
        dir: "ltr"
    },
]

// function init() {
for (let l of language.Languages) {
    language.poolByID[l.id] = l
    language.poolByISO639_1[l.iso639_1] = l
    language.poolByNativeName[l.nativeName] = l
}
// }
