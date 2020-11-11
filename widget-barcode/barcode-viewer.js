/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'

/**
 * 
 */
const barcodeViewerWidget = {
    ID: "barcode-viewer",
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {
        ResolutionHeight: 1280, // HD
        ResolutionWidth: 720, // HD
    },
}
widgets.RegisterWidget(barcodeViewerWidget)

/**
 * 
 * @param {object} options
 */
barcodeViewerWidget.ConnectedCallback = function (options) {
    // TODO::: set options 

    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

barcodeViewerWidget.DisconnectedCallback = function () {}
