/* For license and copyright information please see LEGAL file in repository */

import { LitElement, html, css, unsafeCSS } from '../lit-element/lit-element.js'

Application.Widgets["presentation-preferences"] = {
    ID: "presentation-preferences",
    Text: {
        "en": [
            "",
            "Presentation Preferences",
            "Pick a design language",
            "Pick a color style",
            "Pick a font",
            "Automatic (Browser or OS preference)",
            "Light",
            "Dark"
        ],
        "fa": [
            "",
            "ترجیحات ظاهری",
            "زبان طراحی را انتخاب کنید",
            "ترکیب رنگی را انتخاب کنید",
            "فونت را انتخاب کنید",
            "خودکار - ترجیح مشخص شده در مرورگر یا سیستم عامل",
            "روشن",
            "تیره"
        ],
    }
}

Application.Widgets["presentation-preferences"].HTML = class extends LitElement {
    static get properties() {
        return {}
    }
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
        `
    }
    render() {
        return html`
            <article>
                <header>
                    <h1>${Application.Widgets["presentation-preferences"].LocaleText[1]}</h1>
                </header>
            
                <div>
                    <!-- Change design language by user special day like birthday, wedding, ... -->
                    <select id="designLanguage" @change=${this.setDesignLanguage} .value=${Application.UserPreferences.PresentationPreferences.DesignLanguage}>
                        <option value="material">Material</option>
                        <option value="flat" disabled>Flat</option>
                        <option value="fluent" disabled>Fluent</option>
                        <option value="ant" disabled>Ant</option>
                        <option value="ibm" disabled>IBM</option>
                        <option value="semantic" disabled>Semantic</option>
                    </select>
                    <label for="designLanguage">${Application.Widgets["presentation-preferences"].LocaleText[2]}</label>
            
                    <select id="colorScheme" @change=${this.setColorScheme} .value=${Application.UserPreferences.PresentationPreferences.ColorScheme}>
                        <option value="no-preference">${Application.Widgets["presentation-preferences"].LocaleText[5]}</option>
                        <option value="light">${Application.Widgets["presentation-preferences"].LocaleText[6]}</option>
                        <option value="dark">${Application.Widgets["presentation-preferences"].LocaleText[7]}</option>
                    </select>
                    <label for="colorScheme">${Application.Widgets["presentation-preferences"].LocaleText[3]}</label>
            
                    <select id="font" @change=${this.setPrimaryFont} .value=${Application.UserPreferences.PresentationPreferences.PrimaryFontFamily}>
                        <option value='Roboto'>Roboto</option>
                    </select>
                    <label for="font">${Application.Widgets["presentation-preferences"].LocaleText[4]}</label>
                </div>
            </article>
        `
    }
    setDesignLanguage() {
        Application.UserPreferences.PresentationPreferences.DesignLanguage = this.shadowRoot.getElementById("designLanguage").value
        Application.LoadDesignLanguageStyles()
    }
    setColorScheme() {
        Application.UserPreferences.PresentationPreferences.ColorScheme = this.shadowRoot.getElementById("colorScheme").value
        Application.LoadColorScheme()
    }
    setPrimaryFont() {
        Application.UserPreferences.PresentationPreferences.PrimaryFontFamily = this.shadowRoot.getElementById("font").value
        Application.LoadFontFamilies()
    }
}
customElements.define('widget-presentation-preferences', Application.Widgets["presentation-preferences"].HTML)
