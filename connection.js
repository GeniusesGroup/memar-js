/* For license and copyright information please see LEGAL file in repository */

const connection = {
    status: {},
    type: {},
}

/**
 * return connection status as text indicate in Achaemenid server standard.
 * @param {number} id 
 */
connection.status.GetNameByID = function (id) {
    switch (id) {
        case 0:
            return "LocaleText[0]"
        case 1:
            return "LocaleText[1]"
        case 2:
            return "LocaleText[2]"
        case 3:
            return "LocaleText[3]"
        case 4:
            return "LocaleText[4]"
    }
}

/**
 * return connection type as text in achaemenid server standard.
 * @param {number} id 
 */
connection.type.GetNameByID = function (id) {
    switch (id) {
        case 0:
            return "LocaleText[5]"
        case 1:
            return "LocaleText[6]"
        case 2:
            return "LocaleText[7]"
        case 3:
            return "LocaleText[8]"
        case 4:
            return "LocaleText[9]"
        case 5:
            return "LocaleText[10]"
    }
}
