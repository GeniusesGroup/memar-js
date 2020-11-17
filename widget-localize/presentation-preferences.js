/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'
import '../users.js'

const presentationPreferencesWidget = {
    ID: "presentation-preferences",
    HTML: () => ``,
    CSS: '',
    Templates: {}
}
widgets.poolByID[presentationPreferencesWidget.ID] = presentationPreferencesWidget

presentationPreferencesWidget.ConnectedCallback = function () {
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

presentationPreferencesWidget.DisconnectedCallback = function () {
}

presentationPreferencesWidget.SetDesignLanguage = function (dl) {
    users.active.PresentationPreferences.DesignLanguage = dl
    Application.LoadDesignLanguageStyles()
}

presentationPreferencesWidget.SetColorScheme = function (cs) {
    users.active.PresentationPreferences.ColorScheme = cs
    Application.LoadColorScheme()
}

presentationPreferencesWidget.SetPrimaryFont = function (pf) {
    users.active.PresentationPreferences.PrimaryFontFamily = pf
    Application.LoadFontFamilies()
}
