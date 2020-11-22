/* For license and copyright information please see LEGAL file in repository */

// CRUDs
const CRUDNone = 0 //             0b00000000
const CRUDCreate = 1 //           0b00000001
const CRUDRead = 2 //             0b00000010
// CRUDCreateRead = 3 //          0b00000011
const CRUDUpdate = 4 //           0b00000100
// CRUDCreateUpdate = 5 //        0b00000101
// CRUDReadUpdate = 6 //          0b00000110
// CRUDCreateReadUpdate = 7 //    0b00000111
const CRUDDelete = 8 //           0b00001000
// CRUDCreateDelete = 9 //        0b00001001
// CRUDReadDelete = 10 //         0b00001010
// CRUDCreateReadDelete = 11 //   0b00001011
// CRUDUpdateDelete =  12 //      0b00001100
// CRUDCreateUpdateDelete = 13 // 0b00001101
// CRUDReadUpdateDelete = 14 //   0b00001110
const CRUDAll = 255 //            0b11111111

/**
 * Set given crud to given CRUD!
 * @param {number} crud 
 * 
 * e.g. c = authorization.CRUD.Set(CRUDCreate|CRUDDelete)
 */
authorization.CRUD.Set = function (crud) {
    return crud
}

/**
 * Check check given crud exist in given CRUD!
 * @param {number} cruds
 * @param {number} crud 
 */
authorization.CRUD.Check = function (cruds, crud) {
    if (crud & cruds == crud) {
        return true
    }
    return false
}

/**
 * return authorization CRUD short detail text
 * @param {number} id 
 */
authorization.CRUD.GetShortDetailByID = function (id) {
    switch (id) {
        case CRUDNone:
            return "LocaleText[0]"
        case CRUDCreate:
            return "LocaleText[2]"
        case CRUDRead:
            return "LocaleText[4]"
        case CRUDUpdate:
            return "LocaleText[6]"
        case CRUDDelete:
            return "LocaleText[8]"
        case CRUDAll:
            return "LocaleText[10]"
        default:
            return "LocaleText[12]"
    }
}

/**
 * return authorization CRUD long detail text
 * @param {number} id 
 */
authorization.CRUD.GetLongDetailByID = function (id) {
    switch (id) {
        case CRUDNone:
            return "LocaleText[1]"
        case CRUDCreate:
            return "LocaleText[3]"
        case CRUDRead:
            return "LocaleText[5]"
        case CRUDUpdate:
            return "LocaleText[7]"
        case CRUDDelete:
            return "LocaleText[9]"
        case CRUDAll:
            return "LocaleText[11]"
        default:
            return "LocaleText[13]"
    }
}