/* For license and copyright information please see LEGAL file in repository */

import { html, css, LitElement, unsafeCSS } from '../lit-element/lit-element.js'
import { Languages } from '../gui-engine-js/languages.js'
import { Regions } from '../gui-engine-js/regions.js'
import { Currencies } from '../gui-engine-js/currencies.js'

Application.Widgets["content-preferences"] = {
    ID: "content-preferences",
    Text: {
        "en": [
            "Content Preferences",
            "Language",
            "Region",
            "Currency"
        ],
        "fa": [
            "ترجیحات محتوا",
            "زبان",
            "منطقه یا کشور",
            "واحد پول - ارز"
        ],
    }
}

// https://tools.ietf.org/html/bcp47
Application.Widgets["content-preferences"].HTML = class extends LitElement {
    // static get properties() {
    //     return {}
    // }
    // constructor() {
    //     super()
    // }
    static get styles() {
        return css`
            @import '${unsafeCSS(Application.DesignLanguageStyles)}';

            article {
                position: relative;
                max-width: 600px;
                text-align: center;
                padding: 2%;
                margin: 1% auto;
                left: 0;
                right: 0;
            }

            .card div {
                padding-bottom: 4%;
            }
        `
    }
    render() {
        return html`
            <article>
                <header>
                    <h1>${Application.Widgets["content-preferences"].LocaleText[0]}</h1>
                </header>
            
                <div>
                    <div>
                        <input type="text" id="language" list=languages value=${Application.UserPreferences.ContentPreferences.Language.nativeName} @change=${this.changeLanguage}
                            onfocus="this.value=''" validationMessage="Not supported or bad language selected!">
                        <label for="language">${Application.Widgets["content-preferences"].LocaleText[1]}</label>
                        <datalist id=languages>
                            ${Languages.map(l => {
            if (Application.ContentPreferences.Languages.includes(l.iso639_1)) return html`
                            <option value=${l.nativeName}>${l.englishName}</option>
                            ` })}
                        </datalist>
                    </div>
            
                    <div>
                        <input type="text" id="region" list="countries" value=${Application.UserPreferences.ContentPreferences.Region.nativeName} @change=${this.changeRegion}
                            onfocus="this.value=''" validationMessage="Not supported or bad region selected!">
                        <label for="region">${Application.Widgets["content-preferences"].LocaleText[2]}</label>
                        <datalist id="countries">
                            ${Regions.map(r => html`
                            <option value=${r.nativeName}>${r.englishName}</option>
                            `)}
                        </datalist>
                    </div>
            
                    <div>
                        <input type="text" id="currency" list="currencies" value=${Application.UserPreferences.ContentPreferences.Currency.nativeName}
                            @change=${this.changeCurrency} onfocus="this.value=''" validationMessage="Not supported or bad currency selected!">
                        <label for="region">${Application.Widgets["content-preferences"].LocaleText[3]}</label>
                        <datalist id="currencies">
                            ${Currencies.map(c => html`
                            <option value=${c.nativeName}>${c.englishName}</option>
                            `)}
                        </datalist>
                    </div>
                </div>
            </article>
        `
    }
    changeLanguage() {
        const langInput = this.shadowRoot.getElementById("language")
        const lang = Languages.find(l => l.nativeName === langInput.value)
        if (lang && Application.ContentPreferences.Languages.includes(lang.iso639_1)) {
            Application.UserPreferences.ContentPreferences.Language = lang
            langInput.setCustomValidity("")
            Application.Localize()
        } else {
            // alert user about not supported or bad language selected
            langInput.setCustomValidity(langInput.getAttribute("validationMessage"))
        }
    }
    changeRegion() {
        const regionInput = this.shadowRoot.getElementById("region")
        const region = Regions.find(r => r.nativeName === regionInput.value)
        if (region) {
            Application.UserPreferences.ContentPreferences.Region = region
            regionInput.setCustomValidity("")
        } else {
            // alert user about not supported or bad region selected
            regionInput.setCustomValidity(regionInput.getAttribute("validationMessage"))
        }
    }
    changeCurrency() {
        const currencyInput = this.shadowRoot.getElementById("currency")
        const currency = Currencies.find(c => c.nativeName === currencyInput.value)
        if (currency) {
            Application.UserPreferences.ContentPreferences.Currency = currency
            currencyInput.setCustomValidity("")
        } else {
            // alert user about not supported or bad region selected
            currencyInput.setCustomValidity(currencyInput.getAttribute("validationMessage"))
        }
    }
}

customElements.define('widget-content-preferences', Application.Widgets["content-preferences"].HTML)
