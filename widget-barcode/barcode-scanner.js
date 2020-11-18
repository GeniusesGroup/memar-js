/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'
import '../errors.js'
import './zbar.js'

const barcodeScannerWidget = {
    ID: "barcode-scanner",
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {
        ViewerElementID: "barcodeScannerWidgetViewer",
        ScanPeriod: 100, // 0.1 sec
        ScanDelay: 2000, // 2 sec, set to delay from last successful scan
        ResolutionWidth: 1280, // HD is enough on many barcode
        ResolutionHeight: 720, // HD is enough on many barcode
        /**
         * just call when new barcode detected || pass more than options.ScanDelay
         * @param {ZBarSymbol[]} ZBarSymbols 
         */
        CallBackResults: function test(ZBarSymbols) {
            for (let res of ZBarSymbols) {
                barcodeScannerWidget.Beep(200, 500, 5)
            }
        }
    }
}
widgets.RegisterWidget(barcodeScannerWidget)

/**
 * 
 * @param {object} options same as barcodeScannerWidget.Options
 */
barcodeScannerWidget.ConnectedCallback = function (options) {
    if (options.ViewerElementID) this.Options.ViewerElementID = options.ViewerElementID
    if (options.ScanPeriod) this.Options.ScanPeriod = options.ScanPeriod
    if (options.ScanDelay) this.Options.ScanDelay = options.ScanDelay
    if (options.ResolutionWidth) this.Options.ResolutionWidth = options.ResolutionWidth
    if (options.ResolutionHeight) this.Options.ResolutionHeight = options.ResolutionHeight
    if (options.CallBackResults) this.Options.CallBackResults = options.CallBackResults

    if (!this.video) {
        this.video = document.createElement('video')
        this.video.playsinline = true
        this.video.hidden = true
        this.video.className = "barcodeScannerWidget"
    }

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

    const videoElement = barcodeViewerElement.getElementsByTagName("video")
    if (videoElement.length === 0) {
        barcodeViewerElement.appendChild(this.video)
    }

    if (this.video.hidden) {
        this.viewerEnabled = true
        this.video.hidden = false
    } else {
        this.viewerEnabled = false
        this.video.hidden = true
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
        await barcodeScannerWidget.video.play()

        // TODO::: change ZBar Image class to pass directly imageBitmap if `new ImageCapture(track).grabFrame()` more efficient!
        // const track = barcodeScannerWidget.mediaStream.getVideoTracks()[0]
        // barcodeScannerWidget.imageCapture = new ImageCapture(track)
    } catch (err) {
        // OverconstrainedError : constraint: "facingMode"
        errors.HandleError(err)
        this.scannerEnabled = false
        return
    }

    while (this.scannerEnabled) {
        const res = await barcodeScannerWidget.scan()
        if (res.length === 0) {
            await time.Sleep(this.Options.ScanPeriod)
        } else {
            this.Options.CallBackResults(res)
            await time.Sleep(this.Options.ScanDelay)
        }
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
    const res = await ZBar.ScanRGBABuffer(imgData.data.buffer, width, height, this.scanner)

    // TODO::: change ZBar Image class to pass directly imageBitmap if `new ImageCapture(track).grabFrame()` more efficient!
    // const imageBitmap = await this.imageCapture.grabFrame()
    // const res = await ZBar.ScanImage(imageBitmap, this.scanner)
    return res
}

barcodeScannerWidget.audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext)

/**
 * 
 * All arguments are optional
 * @param {number} duration duration of the tone in milliseconds. Default is 500
 * @param {number} frequency frequency of the tone in hertz. default is 440
 * @param {number} volume volume of the tone. Default is 1, off is 0.
 * @param {string} type type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
 * @param {function} callback callback to use on end of tone
 */
barcodeScannerWidget.Beep = function (duration, frequency, volume, type, callback) {
    let oscillator = this.audioCtx.createOscillator()
    let gainNode = this.audioCtx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioCtx.destination)

    if (volume) gainNode.gain.value = volume
    if (frequency) oscillator.frequency.value = frequency
    if (type) oscillator.type = type
    if (callback) oscillator.onended = callback

    oscillator.start(this.audioCtx.currentTime)
    oscillator.stop(this.audioCtx.currentTime + ((duration || 500) / 1000))
}
