/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'
import { Languages } from '../languages.js'
import { Regions } from '../regions.js'

/**
 * Guess and suggest in stateless localization about change language to its native lang by IP location!
 */
widgets["suggest-language"] = {
    ID: "suggest-language",
    Text: {
        "en": [
            "Suggest edit app language",
            "We think your region's language is English, If you wish to change app language to English please confirm",
            "You can change language in localize page in future",
            "Confirm",
            "Dismiss"
        ],
        "fa": [
            "پیشنهاد اصلاح زبان نرم افزار",
            "ما فکر می کنیم زبان منطقه شما فارسی می باشد، در صورت تمایل به تغییر زبان نرم افزار به فارسی تائید کنید",
            "در آینده می توانید زبان مورد نظر خود را در صفحه محلی سازی تغییر دهید",
            "تغییر زبان",
            "رد کردن",
        ],
        "ar": [
            "اقتراح تعديل لغة التطبيق",
            "نعتقد أن لغة منطقتك هي اللغة العربية ، إذا كنت ترغب في تغيير لغة التطبيق إلى اللغة العربية ، يرجى التأكيد",
            "",
            "تؤكد",
            "رفض"
        ],
        "fr": [
            "Suggérer modifier la langue de l'application",
            "Nous pensons que la langue de votre région est le français. Si vous souhaitez modifier la langue de l'application en français, veuillez confirmer",
            "",
            "Confirmer",
            "Rejeter"
        ],
    },
    HTML: (text) => ``,
    CSS: '',
    Templates: {}
}


widgets["suggest-language"].ConnectedCallback = async function () {
    try {
        // Guess language and region by user IP location and set related localeText!
        // https://api.ipdata.co/?api-key=test
        // https://ipinfo.io/json
        // http://ip-api.com/json
        // http://api.ipgeolocationapi.com/geolocate
        const res = await fetch('https://ipapi.co/json')
        const jsonRes = await res.json()

        this.guessedLanguage = jsonRes.languages.split(",")[0].split("-")[0]
        this.guessedRegion = jsonRes.country
        if (this.guessedLanguage !== Application.UserPreferences.ContentPreferences.Language.iso639_1 && Application.ContentPreferences.Languages.includes(this.guessedLanguage)) {
            const LocaleText = this.Text[this.guessedLanguage]

            const suggestLanguageElement = window.document.createElement("div")
            suggestLanguageElement.id = "suggestLanguage"
            suggestLanguageElement.innerHTML = this.HTML(LocaleText)
            const suggestLanguageStyle = window.document.createElement("style")
            suggestLanguageStyle.innerHTML = this.CSS
            suggestLanguageElement.appendChild(suggestLanguageStyle)

            window.document.documentElement.appendChild(suggestLanguageElement)
        }
    } catch (err) {

    }
}

widgets["suggest-language"].DisconnectedCallback = function () {
}

function suggestLanguageWidgetDismissDialog() {
    document.getElementById("suggestLanguage").remove()

    // Save user preference manually due sometimes closing browser not call beforeunload listeners.
    Application.SaveState()
}

function suggestLanguageWidgetChangeLanguage() {
    Application.UserPreferences.ContentPreferences.Language = Languages.find(l => l.iso639_1 === widgets["suggest-language"].guessedLanguage)
    Application.UserPreferences.ContentPreferences.Region = Regions.find(r => r.iso3166_1_a2 === widgets["suggest-language"].guessedRegion)

    const url = new URL(window.location.href)
    url.searchParams.set('hl', widgets["suggest-language"].guessedLanguage + "-" + widgets["suggest-language"].guessedRegion)
    window.location.replace(url)
}
