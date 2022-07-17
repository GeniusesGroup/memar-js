/* For license and copyright information please see LEGAL file in repository */

import './zbar.js'

const barcodeCameraScannerWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "barcode-camera-scanner",
    },
    Conditions: {},
    HTML: () => ``,
    CSS: '',
    Templates: {},
}
Application.RegisterWidget(barcodeCameraScannerWidget)

/**
 * 
 * @param {object} options
 */
barcodeCameraScannerWidget.ConnectedCallback = function (options) {
    if (!options.ViewerElementID) options.ViewerElementID = "barcodeCameraScannerWidgetViewer"
    if (!options.ScanPeriod) options.ScanPeriod = 50 // 0.05 sec
    if (!options.ScanDelay) options.ScanDelay = 2000 // 2 sec, set to delay from last successful scan
    if (!options.Formats) options.Formats = [ZBar.SymbolTypes.EAN13]
    if (!options.ResolutionWidth) options.ResolutionWidth = 1920 // FHD is enough on many barcode
    if (!options.ResolutionHeight) options.ResolutionHeight = 1280 // FHD is enough on many barcode
    /**
     * just call when new barcode detected || pass more than options.ScanDelay
     * @param {ZBarSymbol[]} ZBarSymbols 
     */
    function test(ZBarSymbols) {
        HTMLAudioElement.Beep(200, 100, 5)
        // for (let res of ZBarSymbols) {
        // }
    }
    if (!options.CallBackResults) options.CallBackResults = test
    this.Options = options

    if (!this.video) {
        this.video = document.createElement('video')
        this.video.playsinline = true
        this.video.hidden = true
        this.video.className = "barcodeCameraScannerWidget"
    }
    if (!this.canvas) {
        this.canvas = document.createElement('canvas')
    }

    pageStylesElement.insertAdjacentHTML("beforeend", this.CSS)
    return this.HTML()
}

barcodeCameraScannerWidget.DisconnectedCallback = function () {
    this.disableScanner()
}

barcodeCameraScannerWidget.toggleViewer = function (element) {
    if (!this.viewerEnabled && !this.scannerEnabled) {
        // TODO::: toast related error
        return
    }

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

    element.toggle()
    if (this.video.hidden) {
        this.viewerEnabled = true
        this.video.hidden = false
        // this.video.play()
    } else {
        this.viewerEnabled = false
        this.video.hidden = true
        // this.video.pause()
    }
}

barcodeCameraScannerWidget.toggleScannerButton = function (element) {
    if (element.checked) {
        this.disableScanner()
        if (this.viewerEnabled) this.toggleViewer(element.nextSibling)
    } else {
        this.enableScanner()
    }
    element.toggle()
}

/**
 * 
 * get last result by call `let results = barcodeCameraScannerWidget.scanner.getResults()`
 */
barcodeCameraScannerWidget.enableScanner = async function () {
    if (!this.imageScanner) {
        this.imageScanner = await ZBar.GetDefaultScanner()
        this.imageScanner.setConfig(ZBar.SymbolTypes.NONE, ZBar.ConfigTypes.ENABLE, 0)
        for (let type of this.Options.Formats) {
            this.imageScanner.setConfig(type, ZBar.ConfigTypes.ENABLE, 1)
        }
        // this.imageScanner.enableCache(true)
    }

    if (this.scannerEnabled) return
    this.scannerEnabled = true

    try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: this.Options.ResolutionWidth },
                height: { ideal: this.Options.ResolutionHeight },
                // frameRate: { ideal: 60 }
            }
        })
        this.video.srcObject = this.mediaStream
        await this.video.play()

        // const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
        // this.imageCapture = new ImageCapture(mediaStreamTrack)
    } catch (err) {
        // OverconstrainedError : constraint: "facingMode"
        Err.NotifyAnyToUser(err)
        this.scannerEnabled = false
        return
    }

    while (this.scannerEnabled) {
        const res = await this.zbarScaner()
        if (res.length === 0) {
            await time.Sleep(this.Options.ScanPeriod)
        } else {
            this.Options.CallBackResults(res)
            await time.Sleep(this.Options.ScanDelay)
        }
    }
}

barcodeCameraScannerWidget.disableScanner = async function () {
    this.scannerEnabled = false
    if (this.mediaStream) {
        // destroy camera usage
        for (let track of this.mediaStream.getTracks()) {
            track.stop()
        }
    }
}

barcodeCameraScannerWidget.zbarScaner = async function () {
    // TODO::: write benchmark to test below!
    // const imageBlob = await this.imageCapture.takePhoto()
    // const imageBitmap = await createImageBitmap(imageBlob)
    // this.canvas.width = imageBitmap.width
    // this.canvas.height = imageBitmap.height
    // const ctx = this.canvas.getContext('2d')
    // ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height)
    // const imgData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height)
    // const res = await ZBar.ScanRGBABuffer(imgData.data.buffer, imageBitmap.width, imageBitmap.height, this.imageScanner)

    // TODO::: write benchmark to test below! It seems not efficient vs direct use `this.video` in canvas!
    // const imageBitmap = await this.imageCapture.grabFrame()
    // this.canvas.width = imageBitmap.width
    // this.canvas.height = imageBitmap.height
    // const ctx = this.canvas.getContext('2d')
    // ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height)
    // const imgData = ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height)
    // const res = await ZBar.ScanRGBABuffer(imgData.data.buffer, imageBitmap.width, imageBitmap.height, this.imageScanner)

    // TODO::: change ZBar Image class to pass directly imageBitmap if `new ImageCapture(track).grabFrame()` more efficient!
    // const imageBlob = await this.imageCapture.takePhoto()
    // const res = await ZBar.ScanImage(imageBlob, this.imageScanner)

    const width = this.video.videoWidth
    const height = this.video.videoHeight
    this.canvas.width = width
    this.canvas.height = height
    const ctx = this.canvas.getContext('2d')
    ctx.drawImage(this.video, 0, 0, width, height)
    const imgData = ctx.getImageData(0, 0, width, height)
    const res = await ZBar.ScanRGBABuffer(imgData.data.buffer, width, height, this.imageScanner)

    return res
}
