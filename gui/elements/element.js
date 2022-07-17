/* For license and copyright information please see LEGAL file in repository */

/**
 * Get next focusable element for any usage!
 * @returns {HTMLElement}
 */
HTMLElement.prototype.nextFocusableElement = function () {
    // add all elements we want to include in our selection
    const focusableElementsQuery = "a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex='0'], [contenteditable], audio[controls], video[controls]"

    const focusableElements = document.querySelectorAll(focusableElementsQuery)
    for (var i = 0; i < focusableElements.length; i++) {
        if (focusableElements[i] === this) {
            i++
            break
        }
    }
    // TODO::: improve check tags attributes
    for (; i < focusableElements.length; i++) {
        if (!focusableElements[i].disabled && !focusableElements[i].hidden) {
            return focusableElements[i]
        }
    }
}

HTMLElement.prototype.focusNext = function () {
    const nextFocusableElement = this.nextFocusableElement()
    if (nextFocusableElement) nextFocusableElement.focus()
}

/**
 * 
 * @param {Err} error Error protocol(interface)
 */
HTMLElement.prototype.warnValidityError = function (error) {
    this.setCustomValidity(error.Detail.Overview)
    this.reportValidity()
    HTMLAudioElement.Beep(400, 100, 5)
    window.navigator.vibrate(60)
}

/**
 * 
 * @param {string=} [type=Default] name of related validity message that set in html attributes e.g. <input validityMessage-{{type}}="" />
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity
 */
HTMLElement.prototype.warnValidity = function (type) {
    if (type === "") {
        this.setCustomValidity("")
    } else {
        let validity = this.validity
        let name = "Default"
        if (validity.badInput) {
            name = "BadInput"
            // } else if (validity.customError) {
            //     name = "CustomError"
        } else if (validity.patternMismatch) {
            name = "PatternMismatch"
        } else if (validity.rangeOverflow) {
            name = "RangeOverflow"
        } else if (validity.rangeUnderflow) {
            name = "RangeUnderflow"
        } else if (validity.stepMismatch) {
            name = "StepMismatch"
        } else if (validity.tooLong) {
            name = "TooLong"
        } else if (validity.tooShort) {
            name = "TooShort"
        } else if (validity.typeMismatch) {
            name = "TypeMismatch"
        } else if (validity.valueMissing) {
            name = "ValueMissing"
        } else if (type) {
            name = type
        }

        const customMessage = this.getAttribute("validityMessage-" + name)
        if (customMessage) {
            this.setCustomValidity(customMessage)
        } else {
            this.setCustomValidity(this.validityMessages[name])
        }

        HTMLAudioElement.Beep(400, 100, 5)
        // TODO::: Vibrate device
    }
    this.reportValidity()
}

// https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
HTMLElement.validityMessages = {
    "BadInput": "",
    "PatternMismatch": "",
    "RangeOverflow": "",
    "RangeUnderflow": "",
    "StepMismatch": "",
    "TooLong": "",
    "TooShort": "",
    "TypeMismatch": "",
    "ValueMissing": "",
    "Default": "",
}
