/* For license and copyright information please see LEGAL file in repository */

import './widget-notification/pop-up.js'
import './widget-notification/center.js'

const errors = {
    poolByID: {},
}

/**
 * New will make new PersiaError, register it on related pools and return error!
 * @param {number} id 
 * @param {string} shortDetail 
 * @param {string} longDetail 
 */
errors.New = function (id, shortDetail, longDetail) {
    let error = new PersiaError(id, shortDetail, longDetail)
    this.poolByID[id] = error
    return error
}

errors.HandleError = function (err) {
    let error
    // TODO::: new more check here for error type!
    // TODO::: toast a dialog about error not alert
    switch (err.constructor) {
        case String:
            if (isNaN(err)) {
                popUpNotificationWidget.New("String Error Occurred", err, "Error")
                return
            } else {
                error = errors.poolByID[Number(err)]
                if (!error) error = errors.poolByID[3689149833]
            }
            break
        case PersiaError:
            error = err
            break
        // case NetworkError:
        case TypeError:
            switch (err.message) {
                case "Failed to fetch":
                    // Toast to GUI about no network connectivity!
                    error = errors.poolByID[1975813724]
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

    popUpNotificationWidget.New(error.Short, error.Long, "Error")
    // centerNotificationWidget.New(error.Short, error.Long + "<hr />" + error.ID, "Error")
}

class PersiaError extends Error {
    constructor(id, shortDetail, longDetail) {
        super(shortDetail)
        this.name = 'PersiaError'
        this.ID = id
        this.Short = shortDetail
        this.Long = longDetail
    }
}
