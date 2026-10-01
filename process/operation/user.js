/* For license and copyright information please see LEGAL file in repository */

// User Types
const UserType_Unset = 0b00000000 // None - Owner of the data with any user type
const UserType_Person = 0b00000010
const UserType_Thing = 0b00000100 // any device or robot with specific intelligence - AI
const UserType_Org = 0b00001000
const UserType_App = 0b00010000
// const UserType_Registered = 0b11111110 // to not indicate user type
const UserType_All = 0b11111111

/**
 * Set given user to given UserType!
 * @param {number} users any above UserType constant
 * 
 * User logical operator OR| to add many types together e.g. ut = protocol.UserType.Set(UserType_Person|UserType_Thing)
 * 
 * User logical operator XOR^ to remove a UserType from base e.g. ut = protocol.UserType.Set(UserType_All^UserType_Thing)
 * 
 * User logical operator NOT^ to reverse a UserType to accept all expect it self! e.g. ut.Set(^UserType_Thing)
 */
protocol.UserType.Set = function (users) {
    return users
}

// Check check given user type exist in given UserType!
protocol.UserType.Check = function (user, UserType) {
    if (user & UserType != user) {
        throw Application.GetErrorByID(2605698703) // ErrUserNotAllow
    }
}

// CheckReverse check given users type exist in given UserType!
protocol.UserType.CheckReverse = function (users, UserType) {
    if (UserType & users != UserType) {
        throw Application.GetErrorByID(2605698703) // ErrUserNotAllow
    }
}

/**
 * return connection type as text in achaemenid server standard.
 * @param {number} id 
 */
protocol.UserType.GetDetailsByID = function (id) {
    switch (id) {
        case UserType_Unset:
            return "LocaleText[5]"
        case UserType_Person:
            return "LocaleText[8]"
        case UserType_Org:
            return "LocaleText[9]"
        case UserType_App:
            return "LocaleText[10]"
        case UserType_Thing:
            return "LocaleText[11]"
        case UserType_All:
            return "LocaleText[12]"
    }
}
