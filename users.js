/* For license and copyright information please see LEGAL file in repository */

import './cookie.js'

const users = {
    active: {},
    guestUser: {},
    poolByID: {},
}

const GuestUserID = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" // Guest UserID == [32]byte{}
const AdminUserID = "gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

/**
 * LoadState read active users state from browser localStorage.
 * return true if it is first time app run from this browser
 */
users.LoadState = function () {
    let firstTime = false

    let usersID = localStorage.getItem('UsersID')
    if (usersID && usersID.length > 10) {
        usersID = JSON.parse(usersID)
        for (id of usersID) {
            let user = JSON.parse(localStorage.getItem(id))
            user.ContentPreferences.Language = language.poolByISO639_1[user.ContentPreferences.Languages[0] || Application.ContentPreferences.Languages[0]]
            user.ContentPreferences.Region = region.poolByISO3166_1_a3[user.ContentPreferences.Regions[0] || Application.ContentPreferences.Regions[0]]
            user.ContentPreferences.Currency = currency.poolByISO4217[user.ContentPreferences.Currencies[0] || Application.ContentPreferences.Currencies[0]]
            this.poolByID[id] = user
        }
    }
    firstTime = this.loadGuestUser()

    let activeUserID = cookie.GetByName(HTTPCookieNameBaseUserID)
    this.active = this.poolByID[activeUserID]
    if (!this.active) {
        this.active = this.guestUser
    }

    return firstTime
}

users.loadGuestUser = function () {
    const guestUserPre = localStorage.getItem(GuestUserID)
    if (guestUserPre && guestUserPre.length > 10) { // && guestUserPre !== "undefined"
        this.guestUser = JSON.parse(guestUserPre)
        this.guestUser.ContentPreferences.Language = language.poolByISO639_1[this.guestUser.ContentPreferences.Languages[0] || Application.ContentPreferences.Languages[0]]
        this.guestUser.ContentPreferences.Region = region.poolByISO3166_1_a3[this.guestUser.ContentPreferences.Regions[0] || Application.ContentPreferences.Regions[0]]
        this.guestUser.ContentPreferences.Currency = currency.poolByISO4217[this.guestUser.ContentPreferences.Currencies[0] || Application.ContentPreferences.Currencies[0]]
    }
    if (this.guestUser.UserID !== GuestUserID) {
        this.guestUser = guestUserPreferences
        this.guestUser.ContentPreferences = Application.ContentPreferences
        this.guestUser.PresentationPreferences = Application.PresentationPreferences
        this.guestUser.HomePage = Application.HomePage
        return true
    }
}

/**
 * SaveState write active users state to browser localStorage before exit app.
 */
window.onbeforeunload = function (event) {
    // If user clear cache, ignore saving
    if (!cookie.GetByName(HTTPCookieNameBaseUserID)) return

    let usersID = []
    for (id in users.poolByID) {
        usersID.push(id)

        let user = users.poolByID[id]
        delete user.ContentPreferences.Language
        delete user.ContentPreferences.Region
        delete user.ContentPreferences.Currency

        localStorage.setItem(id, JSON.stringify(user))
    }
    localStorage.setItem('UsersID', JSON.stringify(usersID))

    users.saveGuestUser()
}

users.saveGuestUser = function () {
    delete users.guestUser.ContentPreferences.Language
    delete users.guestUser.ContentPreferences.Region
    delete users.guestUser.ContentPreferences.Currency
    localStorage.setItem(GuestUserID, JSON.stringify(users.guestUser))
}

/**
 * ChangeActiveUser change desire user state to active UserPreferences.
 * return true if desire userID is new and no saved preferences found.
 * @param {string} userID 
 */
users.ChangeActiveUser = function (userID) {
    let firstTime = false

    let newUser = this.poolByID[userID]
    if (!newUser) {
        newUser = {}
        newUser.UserID = userID
        newUser.UserName = "User"
        newUser.UserPicture = "/not-login-user.svg"
        newUser.ContentPreferences = this.active.ContentPreferences || Application.ContentPreferences
        newUser.PresentationPreferences = this.active.PresentationPreferences || Application.PresentationPreferences
        newUser.HomePage = this.active.HomePage || Application.HomePage
        this.poolByID[userID] = newUser
        firstTime = true
    }
    this.active = newUser

    return firstTime
}

const guestUserPreferences = {
    UserID: GuestUserID,
    UserName: "Guest User",
    UserNumber: 982140000000,
    UserPicture: "/not-login-user.svg",

    ContentPreferences: {
        Languages: [""],
        Regions: [""],
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
