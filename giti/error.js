/* For license and copyright information please see LEGAL file in repository */

import './errors.js'
import './error-errors.js'
import '../widget-notification/pop-up.js'
import '../widget-notification/center.js'

const Giti = {}

class GitiError extends Error {
    constructor(id, urn, domain, shortDetail, longDetail) {
        super(shortDetail)
        this.name = 'GitiError'
        this.ID = id
        this.URN = urn
        this.Domain = domain
        this.Short = shortDetail
        this.Long = longDetail
    }

    /**
     * New will make new GitiError, register it on related pools and return it!
     * @param {string} id BigINT
     * @param {string} urn 
     * @param {string} domain 
     * @param {string} shortDetail 
     * @param {string} longDetail 
     */
    static New(id, urn, domain, shortDetail, longDetail) {
        const persiaError = new GitiError(id, urn, domain, shortDetail, longDetail)
        Giti.Errors.poolByID[id] = persiaError
        Giti.Errors.poolByURN[urn] = persiaError
        return persiaError
    }

    /**
     * Use to notify to user by graphic, sound and vibration!!
     */
    NotifyToUser() {
        // TODO::: 
        console.log(this)

        HTMLAudioElement.Beep(500, 100, 5)
        window.navigator.vibrate(100)

        popUpNotificationWidget.New(this.Domain + " - " + this.Short, this.Long, popUpNotificationWidgetTypeError)
        // centerNotificationWidget.New(this.Short, this.Long + "<hr />" + this.ID, centerNotificationWidgetTypeError)
    }

    /**
     * Use to notify any type of error to user by graphic, sound and vibration!!
     * @param {GitiError|Error|string|number} err 
     */
    static NotifyAnyToUser(err) {
        const persiaError = this.ConvertToGitiError(err)
        this.NotifyToUser(persiaError)
    }

    /**
     * 
     * @param {GitiError|Error|string|number} err 
     */
    static ConvertToGitiError(err) {
        // TODO::: new more check here for error type!
        // TODO::: toast a dialog about error not alert
        switch (err.constructor) {
            case Number:
                err = Giti.Errors.GetByID(err)
                if (!err) err = ErrErrorNotFound
                return err
            case String:
                if (isNaN(err)) {
                    return this.New(0, "String", "Error", err)
                } else {
                    err = Giti.Errors.GetByID(err)
                    if (!err) err = ErrErrorNotFound
                    return err
                }
            case GitiError:
                return err
            // case NetworkError:
            case TypeError:
                switch (err.message) {
                    case "Failed to fetch":
                        return this.poolByID[4224326328] // No Connection
                    default:
                        return this.New(0, "Browser", "Error", err)
                }
            // case EvalError:
            // case InternalError:
            // case RangeError:
            // case ReferenceError:
            // case SyntaxError:
            // case URIError:
            case Error:
                switch (err.message) {
                    default:
                        return this.New(0, "Browser", "Error", err)
                }
            default:
                return this.New(0, "Unknown", "Error", err)
        }
    }
}

Giti.Error = GitiError
