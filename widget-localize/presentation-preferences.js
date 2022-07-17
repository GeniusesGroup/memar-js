/* For license and copyright information please see LEGAL file in repository */

const presentationPreferencesWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "presentation-preferences",
    },
    HTML: () => ``,
    CSS: '',
    Templates: {}
}
Application.RegisterWidget(presentationPreferencesWidget)

presentationPreferencesWidget.ConnectedCallback = function () {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

presentationPreferencesWidget.DisconnectedCallback = function () {
}

presentationPreferencesWidget.SetDesignLanguage = function (dl) {
    OS.User.PresentationPreferences.DesignLanguage = dl
    Application.LoadDesignLanguageStyles()
}

presentationPreferencesWidget.SetColorScheme = function (cs) {
    OS.User.PresentationPreferences.ColorScheme = cs
    Application.LoadColorScheme()
}

presentationPreferencesWidget.SetPrimaryFont = function (pf) {
    OS.User.PresentationPreferences.PrimaryFontFamily = pf
    Application.LoadFontFamilies()
}
