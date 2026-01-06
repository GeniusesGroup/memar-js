/* For license and copyright information please see LEGAL file in repository */

import './errors.js'
import './error-errors.js'
import '../widgets/notification/pop-up.js'
import '../widgets/notification/center.js'
import * as mediatype from "../../identifier/mediatype/mediatype.js"

class Err extends mediatype.MediaType {
    /**
     * 
     * @param {string} id BigINT
     * @param {string} mediatype 
     */
    constructor(id, mediatype) {
        super(id, mediatype)
        this._name = 'Memar Error'
    }

    /**
     * New will make new Err, register it on related pools and return it!
     * @param {string} id BigINT
     * @param {string} mediatype 
     * @return {Err}
     */
    static New(id, mediatype) {
        const persiaError = new Err(id, mediatype)
        Application.RegisterError(persiaError)
        return persiaError
    }

    Name() { return this._name }

    /**
     * Notify error to user by graphic, sound and vibration (Haptic Feedback)
     */
    Notify() {
        // TODO::: 
        console.log(this)

        HTMLAudioElement.Beep(500, 100, 5)
        window.navigator.vibrate(100)

        popUpNotificationWidget.New(this.Detail.Domain + " - " + this.Detail.Summary, this.Detail.Overview, popUpNotificationWidgetTypeError)
        // centerNotificationWidget.New(this.Detail.Summary, this.Detail.Overview + "<hr />" + this.ID, centerNotificationWidgetTypeError)
    }

    // Equal compare two Error.
    Equal(err) {
        if (this._id == err._id) {
            return true
        }
        return false
    }

    /**
     * Use to notify any type of error to user by graphic, sound and vibration!!
     * @param {Err|Error|string|number} err 
     */
    static NotifyAnyToUser(err) {
        const persiaError = this.ConvertToErr(err)
        this.Notify(persiaError)
    }

    /**
     * 
     * @param {Err|Error|string|number} err 
     * @return {Err} related error
     */
    static ConvertToErr(err) {
        // TODO::: new more check here for error type!
        // TODO::: toast a dialog about error not alert
        switch (err.constructor) {
            case Err:
                return err
            case Number:
                err = Application.GetErrorByID(err)
                if (!err) err = ErrErrorNotFound
                return err
            case String:
                if (isNaN(err)) {
                    return ErrBrowserStringError
                } else {
                    err = Application.GetErrorByID(err)
                    if (!err) err = ErrErrorNotFound
                    return err
                }
            // case NetworkError:
            case TypeError:
                switch (err.message) {
                    case "Failed to fetch":
                        return Application.GetErrorByID(4224326328) // No Connection
                    default:
                        return ErrBrowserTypeError
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
                        return ErrBrowserError
                }
            default:
                return ErrUnknownError
        }
    }
}
