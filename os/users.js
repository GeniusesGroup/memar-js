/* For license and copyright information please see LEGAL file in repository */

import '../cookie.js'

OS.users = {}

/**
 * read active users state from browser localStorage.
 * return true if it is first time app run from this browser
 */
OS.users.init = function () {
    const activePersonID = cookie.GetByName(HTTPCookieNameBaseUserID)
    const activeDelegateID = cookie.GetByName(HTTPCookieNameDelegateUserID)

    const savedUser = localStorage.getItem(activePersonID + activeDelegateID)
    const user = JSON.parse(savedUser)
    if (!user) {
        if (activePersonID == GuestUserID) OS.completeGuestUser()
        else user = this.newUser()
        OS.firstTimeRun = true
    }
    OS.User = user
    OS.User.ContentPreferences.Language = language.poolByISO639_1[OS.User.ContentPreferences.Languages[0]] || language.poolByISO639_1[Application.ContentPreferences.Languages[0]]
    OS.User.ContentPreferences.Region = region.poolByISO3166_1_a3[OS.User.ContentPreferences.Regions[0]] || region.poolByISO3166_1_a3[Application.ContentPreferences.Regions[0]]
    OS.User.ContentPreferences.Currency = currency.poolByISO4217[OS.User.ContentPreferences.Currencies[0]] || currency.poolByISO4217[Application.ContentPreferences.Currencies[0]]
}

OS.users.loadPersonsID = function () {
    const savedUsersID = localStorage.getItem('PersonsID')
    const usersID = JSON.parse(savedUsersID)
    if (!Array.isArray(usersID)) return []
    return usersID
}

OS.users.loadDelegateUsersID = function () {
    const savedDelegateUsersID = localStorage.getItem('DelegateUsersID')
    const delegateUsersID = JSON.parse(savedDelegateUsersID)
    if (!Array.isArray(delegateUsersID)) return []
    return delegateUsersID
}

/**
 * 
 * @param {string} personID
 * @param {string} delegateUserID
 */
OS.users.newUser = function (personID, delegateUserID) {
    if (delegateUserID) {
        const delegateUsersID = this.loadDelegateUsersID()
        delegateUsersID.push(personID + delegateUserID)
        localStorage.setItem('DelegateUsersID', JSON.stringify(delegateUsersID))
    } else {
        const personsID = this.loadPersonsID()
        delegateUsersID.push(personID)
        localStorage.setItem('PersonsID', JSON.stringify(delegateUsersID))
    }
    return {
        ID: personID,
        // UserType: UserTypePerson,
        DelegateUserID: delegateUserID,
        // DelegateUserType: UserTypeOrg,
        Name: "Undefined",
        Picture: "/not-login-user.svg",
        ContentPreferences: OS.User.ContentPreferences || Application.ContentPreferences,
        PresentationPreferences: OS.User.PresentationPreferences || Application.PresentationPreferences,
        HomePage: Application.HomePage,
    }
}

OS.users.save = async function () {
    // TODO::: If user clear cache, ignore saving??
    if (!cookie.GetByName(HTTPCookieNameBaseUserID)) return
    localStorage.setItem(OS.User.ID + OS.User.DelegateUserID, JSON.stringify(OS.User))
}
