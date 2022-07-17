/* For license and copyright information please see LEGAL file in repository */

import * as timer from '../timer/sleep.js'

const barcodeReaderWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "barcode-reader",
    },
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
}
Application.RegisterWidget(barcodeReaderWidget)

/**
 * 
 * @param {object} options
 */
barcodeReaderWidget.ConnectedCallback = function (options) {
    // if (!options.InputElementID) options.ViewerElementID = "barcodeReaderWidgetInput"
    if (!options.ignoreIfFocusOn) options.ignoreIfFocusOn = false // do not handle scans if the currently focused element matches this selector or object
    if (!options.avgTimeByChar) options.avgTimeByChar = 150 // 0.15 sec as Average time (ms) between 2 chars. Used to differentiate between keyboard typing and scanning
    if (!options.minLength) options.minLength = 8 // Minimum length for a scanning
    if (!options.Formats) options.Formats = [ZBar.SymbolTypes.EAN13]
    if (!options.prefixKeyCodes) options.prefixKeyCodes = [] // Chars to remove and means start of scanning
    if (!options.suffixKeyCodes) options.suffixKeyCodes = [9, 13] // Chars to remove and means end of scanning! 9=tab & 13=enter
    function test(string) {
        HTMLAudioElement.Beep(200, 100, 5)
    }
    if (!options.CallBackResults) options.CallBackResults = test
    this.Options = options

    this.barcodeString = ""

    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

barcodeReaderWidget.DisconnectedCallback = function () {
    this.disableScanner()
}

barcodeReaderWidget.toggleReaderButton = function (element) {
    if (element.checked) {
        this.disableScanner()
    } else {
        this.enableScanner()
    }
    element.toggle()
    element.blur()
}

barcodeReaderWidget.enableScanner = function () {
    document.addEventListener("keydown", barcodeReaderWidget.keydownListener)
    document.addEventListener("paste", barcodeReaderWidget.pasteListener)
}

barcodeReaderWidget.disableScanner = function () {
    document.removeEventListener('keydown', barcodeReaderWidget.keydownListener)
    document.removeEventListener("paste", barcodeReaderWidget.pasteListener)
}

barcodeReaderWidget.handleBarcodeString = function () {
    if (this.barcodeString.length >= this.Options.minLength) {
        if (this.Options.InputElementID) {
            const element = document.getElementById(this.Options.InputElementID)
            if (element) {
                element.value = this.barcodeString
            }
        }
        this.Options.CallBackResults(this.barcodeString)
    }

    // reset for next reading
    this.barcodeString = ""
}

barcodeReaderWidget.keydownListener = async function (event) {
    const targetName = event.target.localName
    if (targetName === 'input') {
        return
    }

    const keyCode = event.keyCode
    for (let kc of barcodeReaderWidget.Options.prefixKeyCodes) {
        if (kc === keyCode) {
            return
        }
    }
    for (let kc of barcodeReaderWidget.Options.suffixKeyCodes) {
        if (kc === keyCode) {
            barcodeReaderWidget.handleBarcodeString()
            return
        }
    }

    // case keyCode >= 48 && keyCode <= 90: // numbers and letters
    // case keyCode >= 96 && keyCode <= 105: // numbers on numeric keypad
    // case keyCode >= 106 && keyCode <= 111: // operations on numeric keypad (+, -, etc.)
    if (keyCode >= 48 && keyCode <= 111) {
        barcodeReaderWidget.barcodeString += event.key // String.fromCharCode(event.which)
    } else {
        return
    }

    const len = barcodeReaderWidget.barcodeString.length
    await timer.Sleep(barcodeReaderWidget.Options.avgTimeByChar)

    if (barcodeReaderWidget.barcodeString.length === len) {
        barcodeReaderWidget.handleBarcodeString()
    }
}

barcodeReaderWidget.pasteListener = function (event) {
    const targetName = event.target.localName
    if (targetName === 'input') {
        return
    }

    barcodeReaderWidget.barcodeString = (event.clipboardData || window.clipboardData).getData('text')
    barcodeReaderWidget.handleBarcodeString()
}
