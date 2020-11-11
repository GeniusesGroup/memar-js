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
        for (id of usersID) this.poolByID[id] = JSON.parse(localStorage.getItem(id))
    }

    const guestUserPre = localStorage.getItem(GuestUserID)
    if (guestUserPre && guestUserPre.length > 10) { // && guestUserPre !== "undefined"
        this.guestUser = JSON.parse(guestUserPre)
    }
    if (this.guestUser.UserID !== GuestUserID) {
        this.guestUser = guestUserPreferences
        this.guestUser.ContentPreferences = Application.ContentPreferences
        this.guestUser.PresentationPreferences = Application.PresentationPreferences
        this.guestUser.HomePage = Application.HomePage
        firstTime = true
        localStorage.setItem(GuestUserID, JSON.stringify(users.guestUser))
    }

    let activeUserID = cookie.GetByName(HTTPCookieNamePersonID)
    this.active = this.poolByID[activeUserID]
    if (!this.active) {
        this.active = this.guestUser
    }

    return firstTime
}

/**
 * SaveState write active users state to browser localStorage.
 */
users.SaveState = function () {
    // If user clear cache, ignore saving
    if (!cookie.GetByName(HTTPCookieNamePersonID)) return

    let usersID = []
    for (id in users.poolByID) {
        usersID.push(id)
        localStorage.setItem(id, JSON.stringify(users.poolByID[id]))
    }
    localStorage.setItem('UsersID', JSON.stringify(usersID))

    localStorage.setItem(GuestUserID, JSON.stringify(users.guestUser))
}

// Save UserPreferences on user exit app!
window.addEventListener('beforeunload', users.SaveState, false)

/**
 * ChangeActiveUser change desire user state to active UserPreferences.
 * return true if desire userID is new and no saved preferences found.
 * @param {string} userID 
 */
users.ChangeActiveUser = function (userID) {
    let firstTime = false

    // First save active user preferences
    localStorage.setItem(this.active.UserID, JSON.stringify(this.active))

    if (!this.poolByID[userID]) {
        this.poolByID[userID] = {}
        this.poolByID[userID].UserID = userID
        this.poolByID[userID].UserName = "User"
        this.poolByID[userID].UserPicture = "/not-login-user.svg"
        this.poolByID[userID].ContentPreferences = this.active.ContentPreferences || Application.ContentPreferences
        this.poolByID[userID].PresentationPreferences = this.active.PresentationPreferences || Application.PresentationPreferences
        this.poolByID[userID].HomePage = this.active.HomePage || Application.HomePage
        firstTime = true
    }
    this.active = this.poolByID[userID]

    return firstTime
}

const guestUserPreferences = {
    UserID: GuestUserID,
    UserName: "Guest User",
    UserNumber: 982140000000,
    UserPicture: "/not-login-user.svg",

    ContentPreferences: {
        Language: {
            englishName: "",
            nativeName: "",
            iso639_1: "",
            iso639_2T: "",
            iso639_2B: "",
            iso639_3: "",
            dir: "",
        },
        Region: {
            englishName: "",
            nativeName: "",
            iso3166_1_a2: "",
            iso3166_1_a3: "",
            iso3166_1_num: "",
            phone: "",
            continent: "",
            capital: "",
            currency: "",
            languages: [""]
        },
        Currency: {
            englishName: "",
            nativeName: "",
            iso4217: "",
            iso4217_num: 0,
            symbol: "",
        },
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
