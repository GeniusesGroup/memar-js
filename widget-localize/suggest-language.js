/* For license and copyright information please see LEGAL file in repository */

import '../language/language.js'
import '../region/region.js'
import '../error/error.js'

/**
 * Guess and suggest in stateless localization about change language to its native lang by IP location!
 */
const suggestLanguageWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "suggest-language",
    },
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
Application.RegisterWidget(suggestLanguageWidget)

suggestLanguageWidget.ConnectedCallback = async function () {
    try {
        // Guess language and region by user IP location and set related localeText!

        const res = await fetch('https://ipapi.co/json')
        const jsonRes = await res.json()

        this.guessedLanguage = jsonRes.languages.split(",")[0].split("-")[0]
        this.guessedRegion = jsonRes.country
        if (this.guessedLanguage !== OS.User.ContentPreferences.Language.iso639_1 && Application.ContentPreferences.Languages.includes(this.guessedLanguage)) {
            const LocaleText = this.Text[this.guessedLanguage]

            this.suggestLanguageElement = window.document.createElement("div")
            this.suggestLanguageElement.innerHTML = this.HTML(LocaleText)
            const suggestLanguageStyle = window.document.createElement("style")
            suggestLanguageStyle.innerHTML = this.CSS
            this.suggestLanguageElement.appendChild(suggestLanguageStyle)

            window.document.documentElement.appendChild(this.suggestLanguageElement)
        }
    } catch (err) {
        Err.NotifyAnyToUser(err)
    }
}

suggestLanguageWidget.DisconnectedCallback = function () {
}

suggestLanguageWidget.DismissDialog = function () {
    this.suggestLanguageElement.remove()
}

suggestLanguageWidget.ChangeLanguage = function () {
    OS.User.ContentPreferences.Language = language.poolByISO639_1[suggestLanguageWidget.guessedLanguage]
    OS.User.ContentPreferences.Region = region.poolByISO3166_1_a2[suggestLanguageWidget.guessedRegion]

    const url = new URL(window.location.href)
    url.searchParams.set('hl', suggestLanguageWidget.guessedLanguage + "-" + suggestLanguageWidget.guessedRegion)
    window.location.replace(url)
}
