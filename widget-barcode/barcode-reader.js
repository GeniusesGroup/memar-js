/* For license and copyright information please see LEGAL file in repository */

const barcodeReaderWidget = {
    ID: "barcode-reader",
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
}
widgets.RegisterWidget(barcodeReaderWidget)

/**
 * 
 * @param {object} options
 */
barcodeReaderWidget.ConnectedCallback = function (options) {
    
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

barcodeReaderWidget.DisconnectedCallback = function () {
    this.disableScanner()
}

barcodeReaderWidget.toggleReaderButton = function (element) {
    if (element.checked) {
        element.checked = false
    } else {
        element.checked = true
        alert("Sorry! Not implemented yet!")
    }
}