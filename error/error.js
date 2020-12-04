/* For license and copyright information please see LEGAL file in repository */

import '../widget-notification/pop-up.js'
import '../widget-notification/center.js'
import './errors.js'

class PersiaError extends Error {
    constructor(id, domain, shortDetail, longDetail) {
        super(shortDetail)
        this.name = 'PersiaError'
        this.ID = id
        this.Domain = domain
        this.Short = shortDetail
        this.Long = longDetail
    }
}

PersiaError.poolByID = {}

/**
 * New will make new PersiaError, register it on related pools and return it!
 * @param {number} id 
 * @param {string} domain 
 * @param {string} shortDetail 
 * @param {string} longDetail 
 */
PersiaError.New = function (id, domain, shortDetail, longDetail) {
    const persiaError = new PersiaError(id, domain, shortDetail, longDetail)
    this.poolByID[id] = persiaError
    return persiaError
}

/**
 * 
 * @param {number} id ID of desire error
 */
PersiaError.GetByID = function (id) {
    return this.poolByID[id]
}

/**
 * 
 * @param {PersiaError|Error|string|number} err 
 */
PersiaError.NotifyError = function (err) {
    console.log(err)

    let persiaError
    // TODO::: new more check here for error type!
    // TODO::: toast a dialog about error not alert
    switch (err.constructor) {
        case Number:
            persiaError = this.poolByID[err]
            if (!persiaError) persiaError = ErrErrorNotFound
        case String:
            if (isNaN(err)) {
                popUpNotificationWidget.New("String Error Occurred", err, "Error")
                return
            } else {
                persiaError = this.poolByID[Number(err)]
                if (!error) persiaError = ErrErrorNotFound
            }
            break
        case PersiaError:
            persiaError = err
            break
        // case NetworkError:
        case TypeError:
            switch (err.message) {
                case "Failed to fetch":
                    persiaError = this.poolByID[4224326328] // No Connection
                    break
                default:
                    popUpNotificationWidget.New("Browser Error Occurred", err, "Error")
                    return
            }
            break
        // case EvalError:
        // case InternalError:
        // case RangeError:
        // case ReferenceError:
        // case SyntaxError:
        // case URIError:
        case Error:
            switch (err.message) {
                default:
                    popUpNotificationWidget.New("Browser Error Occurred", err, "Error")
                    return
            }
        // break
        default:
            popUpNotificationWidget.New("Unknown Error Occurred", err, "Error")
            return
        // break
    }

    popUpNotificationWidget.New(persiaError.Domain + " - " + persiaError.Short, persiaError.Long, "Error")
    // centerNotificationWidget.New(persiaError.Short, persiaError.Long + "<hr />" + persiaError.ID, "Error")
}
