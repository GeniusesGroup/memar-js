/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'


// Free:
// https://github.com/samsam2310/zbar.wasm
// https://github.com/jjhbw/barcode-scanner-webassembly

// Paid:
// https://github.com/Dynamsoft/javascript-barcode
// https://docs.scandit.com/4.3/web/index.html

/**
 * 
 */
const barcodeScannerWidget = {
    ID: "barcode-scanner",
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {
        DuplicateDelay: 1000, // 1 sec
        ResolutionHeight: 1280, // HD is enough on many barcode
        ResolutionWidth: 720, // HD is enough on many barcode
    },
}
widgets.RegisterWidget(barcodeScannerWidget)

/**
 * 
 * @param {object} options
 */
barcodeScannerWidget.Init = function (options) {
    // Set given objects if exist

    // Load related Wasm file
    try {
        // TODO:::
    } catch (err) {
        errors.HandleError(err)
        return
    }
}

/**
 * 
 * @param {function({TypeName: "", Data: ""}[])} callBackResults just call when new barcode detected or pass more than Options.DuplicateDelay from last barcode!
 */
barcodeScannerWidget.ConnectedCallback = function (callBackResults) {
    this.Options.callBackResults = callBackResults
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

barcodeScannerWidget.DisconnectedCallback = function () {
    this.disableScanner()
}

barcodeScannerWidget.toggleScannerButton = function (element) {
    if (element.checked) {
        element.checked = false
        barcodeScannerWidget.disableScanner()
    } else {
        element.checked = true
        barcodeScannerWidget.enableScanner()
    }
}

barcodeScannerWidget.enableScanner = async function () {
    if (this.scannerEnabled) return
    this.scannerEnabled = true

    const res = await scanImageData(img);
    this.Options.callBackResults(res)
}

barcodeScannerWidget.disableScanner = async function () {
    this.scannerEnabled = false

    // TODO::: destroy camera usage
}
