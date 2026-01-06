/* For license and copyright information please see LEGAL file in repository */

import './errors.js'
import './error-errors.js'
import '../widget-notification/pop-up.js'
import '../widget-notification/center.js'

class GitiError extends Error {
    /**
     * 
     * @param {string} id BigINT
     * @param {string} urn 
     */
    constructor(id, urn) {
        super(urn)
        this.name = 'GitiError'
        this.ID = id
        this.URN = urn
    }

    /**
     * New will make new GitiError, register it on related pools and return it!
     * @param {string} id BigINT
     * @param {string} urn 
     */
    static New(id, urn) {
        const persiaError = new GitiError(id, urn)
        Application.errors.addError(persiaError)
        return persiaError
    }

    /**
     * 
     * @param {string} domain 
     * @param {string} short
     * @param {string} long
     * @param {string} userAction 
     * @param {string} devAction 
     */
    SetDetail(domain, short, long, userAction, devAction) {
        this.Detail = {
            Domain: domain,
            Short: short,
            Long: long,
            UserAction: userAction,
            DevAction: devAction
        }
    }

    /**
     * Use to notify to user by graphic, sound and vibration!!
     */
    NotifyToUser() {
        // TODO::: 
        console.log(this)

        HTMLAudioElement.Beep(500, 100, 5)
        window.navigator.vibrate(100)

        popUpNotificationWidget.New(this.Detail.Domain + " - " + this.Detail.Short, this.Detail.Long, popUpNotificationWidgetTypeError)
        // centerNotificationWidget.New(this.Detail.Short, this.Detail.Long + "<hr />" + this.ID, centerNotificationWidgetTypeError)
    }

    // Equal compare two Giti Error.
    Equal(err) {
        if (this.id == err.id) {
            return true
        }
        return false
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
                err = Application.GetErrorByID(err)
                if (!err) err = ErrErrorNotFound
                return err
            case String:
                if (isNaN(err)) {
                    return this.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("String", "Error", err)
                } else {
                    err = Application.GetErrorByID(err)
                    if (!err) err = ErrErrorNotFound
                    return err
                }
            case GitiError:
                return err
            // case NetworkError:
            case TypeError:
                switch (err.message) {
                    case "Failed to fetch":
                        return Application.GetErrorByID(4224326328) // No Connection
                    default:
                        return this.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("Browser", "Error", err)
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
                        return this.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("Browser", "Error", err)
                }
            default:
                return this.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("Unknown", "Error", err)
        }
    }
}
