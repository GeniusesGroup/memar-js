/* For license and copyright information please see LEGAL file in repository */

// Languages code
const LanguageUnset = 0
const LanguageMachine = 1
const LanguageMathematics = 2
const LanguageMusical = 3
const LanguageSign = 4  // https://en.wikipedia.org/wiki/Sign_language

const LanguagePersian = 5
const LanguageEnglish = 6
const LanguageRussian = 7
const LanguageArabic = 8

// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
language.Languages = [
    {
        ID: LanguageArabic,
        englishName: "Arabic",
        nativeName: "العربية",
        iso639_1: "ar",
        iso639_2T: "ara",
        iso639_2B: "ara",
        iso639_3: "ara",
        dir: "rtl",
    }, {
        englishName: "Chinese",
        nativeName: "中文",
        iso639_1: "zh",
        iso639_2T: "zho",
        iso639_2B: "chi",
        iso639_3: "zho",
        dir: "ltr"
    }, {
        ID: LanguageEnglish,
        englishName: "English",
        nativeName: "English",
        iso639_1: "en",
        iso639_2T: "eng",
        iso639_2B: "eng",
        iso639_3: "eng",
        dir: "ltr",
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
        ID: LanguagePersian,
        englishName: "Persian",
        nativeName: "فارسی",
        iso639_1: "fa",
        iso639_2T: "fas",
        iso639_2B: "per",
        iso639_3: "fas",
        dir: "rtl",
    }, {
        ID: LanguageRussian,
        englishName: "Russian",
        nativeName: "русский",
        iso639_1: "ru",
        iso639_2T: "rus",
        iso639_2B: "rus",
        iso639_3: "rus",
        dir: "ltr"
    },
]
