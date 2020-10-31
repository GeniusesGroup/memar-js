/* For license and copyright information please see LEGAL file in repository */

const authorization = {
    CRUD: {}
}

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
const CRUDAll = 15 //             0b00001111

authorization.CRUD.GetNameByID = function (id) {
    switch (id) {
        case CRUDNone:
            return "LocaleText[0]"
        case CRUDCreate:
            return "LocaleText[1]"
        case CRUDRead:
            return "LocaleText[2]"
        case CRUDUpdate:
            return "LocaleText[3]"
        case CRUDDelete:
            return "LocaleText[4]"
        case CRUDAll:
            return "LocaleText[5]"
    }
}
