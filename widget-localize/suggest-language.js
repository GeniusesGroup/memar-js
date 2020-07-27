/* For license and copyright information please see LEGAL file in repository */

import { html, css, LitElement, unsafeCSS } from '../lit-element/lit-element.js'
import { Languages } from '../gui-engine-js/languages.js'
import { Regions } from '../gui-engine-js/regions.js'

Application.Widgets["suggest-language"] = {
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
            "در آینده می توانید زبان مورد نظر خود را در بخش محلی سازی تغییر دهید",
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
    }
}

/**
 * Guess and suggest in stateless localization about change language to its native lang by IP location!
 */
Application.Widgets["suggest-language"].HTML = class extends LitElement {
    static get properties() {
        return {
            suggestDifferentLanguage: Boolean,
            guessedLanguage: String,
            guessedRegion: String,
        }
    }
    constructor() {
        super()
        this.suggestDifferentLanguage = false
        // Set after suggest language!
        this.localeText = ["", "", "", "", ""]
    }
    connectedCallback() {
        super.connectedCallback();
        // Guess language and region by user IP location and set related localeText!
        // https://api.ipdata.co/?api-key=test
        // https://ipinfo.io/json
        // http://ip-api.com/json
        // http://api.ipgeolocationapi.com/geolocate
        fetch('https://ipapi.co/json').then(res => res.json()).then(json => {
            this.guessedLanguage = json.languages.split(",")[0].split("-")[0]
            this.guessedRegion = json.country
            if (this.guessedLanguage !== Application.UserPreferences.ContentPreferences.Language.iso639_1 && Application.ContentPreferences.Languages.includes(this.guessedLanguage)) {
                this.localeText = Application.Widgets["suggest-language"].Text[this.guessedLanguage]
                this.suggestDifferentLanguage = true
            }
        })
    }
    static get styles() {
        return css`
            @import '${unsafeCSS(Application.DesignLanguageStyles)}';
            
            dialog {
                position: fixed;
                max-width: 600px;
                text-align: center;
                margin: 1% auto;
                left: 0;
                right: 0;
            }

            dialog div {
                padding-bottom: 0px;
            }
        `
    }
    render() {
        return html`
            <div class="disabledBackground" ?hidden=${!this.suggestDifferentLanguage}></div>
            <dialog type="modal" id="suggest-language" ?open=${this.suggestDifferentLanguage}>
                <header>${this.localeText[0]}</header>
                <div>
                    <p>${this.localeText[1]}</p>
                    <a href="/localize">
                        <p>${this.localeText[2]}</p>
                    </a>
            
                    <!-- TODO : May suggested language is not user native so user can't understand dialog usage or even clos it!  -->
                    <!-- User should have ability to change dialog text language manually||english -->
                </div>
                <footer>
                    <button type="button" @click=${this.changeLanguage}>
                        <label>${this.localeText[3]}</label>
                    </button>
                    <button type="button" @click=${this.closeDialog}>
                        <label>${this.localeText[4]}</label>
                    </button>
                </footer>
            </dialog>
        `
    }
    closeDialog() {
        this.suggestDifferentLanguage = false
        // Save user preference manually due sometimes closing browser not call beforeunload.
        Application.Save()
    }
    changeLanguage() {
        Application.UserPreferences.ContentPreferences.Language = Languages.find(l => l.iso639_1 === this.guessedLanguage)
        Application.UserPreferences.ContentPreferences.Region = Regions.find(r => r.iso3166_1_a2 === this.guessedRegion)

        const url = new URL(window.location.href)
        url.searchParams.set('hl', this.guessedLanguage + "-" + this.guessedRegion)
        window.location.replace(url)
    }
}
customElements.define('widget-suggest-language', Application.Widgets["suggest-language"].HTML)
