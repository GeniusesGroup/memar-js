/* For license and copyright information please see LEGAL file in repository */

const GuestUserID = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" // Guest UserID == [32]byte{}
const AdminUserID = "gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

OS.User = {
    ID: GuestUserID,
    // Type: UserTypeGuest,
    DelegateUserID: "",
    DelegateUserType: "",
    DelegateConnID: "",
    Name: "Guest User",
    Number: 982140000000,
    Picture: "/not-login-user.svg",
    ContentPreferences: {
        Languages: ["en"],
        Regions: ["gb"],
        Currencies: [""],
    },
    PresentationPreferences: {
        DesignLanguage: "material",
        Contrast: "",
        ColorScheme: "no-preference",
        InvertedColors: false,
        ReducedMotion: false,
        ReducedTransparency: false,
        PrimaryFontFamily: "Roboto",
        SecondaryFontFamily: "",
    },
    HomePage: "",
    MostUsedPages: null, // []
    // Misc or miscellaneous key use by any page or widget to store needed persistent locale data
    Misc: {}
}

OS.completeGuestUser = function() {
    language.SuggestLanguage()
    language.SupportedLanguagesAlternateLink()
}
