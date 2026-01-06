/* For license and copyright information please see LEGAL file in repository */

// User Types
const UserTypeUnset = 0b00000000 // None, UserType not set yet!
const UserTypeGuest = 0b00000001
const UserTypeRegistered = 0b00000010 // to not indicate user type
const UserTypePerson = 0b00000100
const UserTypeOrg = 0b00001000
const UserTypeApp = 0b00010000
const UserTypeAI = 0b00100000 // Robots
const UserTypeAll = 0b11111111

/**
 * Set given user to given UserType!
 * @param {number} users any above UserType constant
 * 
 * User logical operator OR| to add many types together e.g. ut = authorization.UserType.Set(UserTypePerson|UserTypeAI)
 * 
 * User logical operator XOR^ to remove a UserType from base e.g. ut = authorization.UserType.Set(UserTypeAll^UserTypeAI)
 * 
 * User logical operator NOT^ to reverse a UserType to accept all expect it self! e.g. ut.Set(^UserTypeAI)
 */
authorization.UserType.Set = function (users) {
    return users
}

// Check check given user type exist in given UserType!
authorization.UserType.Check = function (user, UserType) {
    if (user & UserType != user) {
        throw errors.poolByID[2605698703] // ErrUserNotAllow
    }
}

// CheckReverse check given users type exist in given UserType!
authorization.UserType.CheckReverse = function (users, UserType) {
    if (UserType & users != UserType) {
        throw errors.poolByID[2605698703] // ErrUserNotAllow
    }
}

/**
 * return connection type as text in achaemenid server standard.
 * @param {number} id 
 */
authorization.UserType.GetDetailsByID = function (id) {
    switch (id) {
        case UserTypeUnset:
            return "LocaleText[5]"
        case UserTypeGuest:
            return "LocaleText[6]"
        case UserTypeRegistered:
            return "LocaleText[7]"
        case UserTypePerson:
            return "LocaleText[8]"
        case UserTypeOrg:
            return "LocaleText[9]"
        case UserTypeApp:
            return "LocaleText[10]"
        case UserTypeAI:
            return "LocaleText[11]"
        case UserTypeAll:
            return "LocaleText[12]"
    }
}
