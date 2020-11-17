/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'
import './zbar.js'

const barcodeScannerWidget = {
    ID: "barcode-scanner",
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {
        ViewerElementID: "barcodeScannerWidgetViewer",
        ScanPeriod: 500, // 0.5 sec
        DuplicateDelay: 1000, // 1 sec
        ResolutionWidth: 1280, // HD is enough on many barcode
        ResolutionHeight: 720, // HD is enough on many barcode
    },
}
widgets.RegisterWidget(barcodeScannerWidget)

/**
 * 
 * @param {object} options
 */
barcodeScannerWidget.Init = async function (options) {
    // TODO::: Set given options if exist
}

/**
 * 
 * @param {function(ZBarSymbol[])} callBackResults just call when new barcode detected or pass more than Options.DuplicateDelay from last barcode!
 */
barcodeScannerWidget.ConnectedCallback = function (callBackResults) {
    if (!this.video) {
        this.video = document.createElement('video')
        this.video.setAttribute('playsinline', '')
    }

    this.Options.callBackResults = callBackResults
    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

barcodeScannerWidget.toggleViewer = function () {
    if (!this.video) {
        // TODO::: toast related error
        return
    }
    const barcodeViewerElement = document.getElementById(this.Options.ViewerElementID)
    if (!barcodeViewerElement) {
        // TODO::: toast related error
        return
    }
    if (barcodeViewerElement.childNodes.length > 0) {
        this.viewerEnabled = false
        barcodeViewerElement.innerText = ""
    } else {
        this.viewerEnabled = true
        barcodeViewerElement.appendChild(this.video)
    }
}

barcodeScannerWidget.DisconnectedCallback = function () {
    this.disableScanner()
}

barcodeScannerWidget.toggleScannerButton = function (element) {
    if (element.checked) {
        element.checked = false
        barcodeScannerWidget.disableScanner()
        if (this.viewerEnabled) this.toggleViewer()
    } else {
        element.checked = true
        barcodeScannerWidget.enableScanner()
    }
}

/**
 * 
 * get last result by call `let results = barcodeScannerWidget.scanner.getResults()`
 */
barcodeScannerWidget.enableScanner = async function () {
    if (!this.scanner) {
        this.scanner = await ZBar.GetDefaultScanner()
        // scanner.setConfig({})
    }

    if (this.scannerEnabled) return
    this.scannerEnabled = true

    try {
        barcodeScannerWidget.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: this.Options.ResolutionWidth },
                height: { ideal: this.Options.ResolutionHeight },
                frameRate: { ideal: 1000 / this.Options.ScanPeriod }
            }
        })
        barcodeScannerWidget.video.srcObject = barcodeScannerWidget.mediaStream
        barcodeScannerWidget.video.play()
        await new Promise(r => {
            barcodeScannerWidget.video.onloadedmetadata = r
        })
    } catch (err) {
        // OverconstrainedError : constraint: "facingMode"
        errors.HandleError(err)
        this.scannerEnabled = false
        return
    }

    while (this.scannerEnabled) {
        const res = await barcodeScannerWidget.scan()
        this.Options.callBackResults(res)
        await time.Sleep(this.Options.ScanPeriod)
    }
}

barcodeScannerWidget.disableScanner = async function () {
    this.scannerEnabled = false
    // destroy camera usage
    for (let track of barcodeScannerWidget.mediaStream.getTracks()) {
        track.stop()
    }

}

barcodeScannerWidget.scan = async function () {
    const canvas = document.createElement('canvas')
    const width = this.video.videoWidth
    const height = this.video.videoHeight
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(this.video, 0, 0, width, height)
    const imgData = ctx.getImageData(0, 0, width, height)
    const res = await ZBar.ScanImageData(imgData, this.scanner)
    return res
}
