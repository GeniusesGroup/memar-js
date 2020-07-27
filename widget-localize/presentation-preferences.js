/* For license and copyright information please see LEGAL file in repository */

Application.Widgets["presentation-preferences"] = {
    ID: "presentation-preferences",
    HTML: () => ``,
    CSS: '',
    Templates: {}
}

Application.Widgets["presentation-preferences"].ConnectedCallback = function () {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

Application.Widgets["presentation-preferences"].DisconnectedCallback = function () {
}

function setDesignLanguage(dl) {
    Application.UserPreferences.PresentationPreferences.DesignLanguage = dl
    Application.LoadDesignLanguageStyles()
}
function setColorScheme(cs) {
    Application.UserPreferences.PresentationPreferences.ColorScheme = cs
    Application.LoadColorScheme()
}
function setPrimaryFont(pf) {
    Application.UserPreferences.PresentationPreferences.PrimaryFontFamily = pf
    Application.LoadFontFamilies()
}
