/* For license and copyright information please see LEGAL file in repository */

import '../errors.js'
import './zbar-v0.wasm'

/**
 * 
 * use compiled version of ZBar web-asembly(zbar.wasm) from: https://github.com/samsam2310/zbar.wasm
 * 
 * Other open-source resources: 
 * https://github.com/jjhbw/barcode-scanner-webassembly
 * 
 * Other Paid Resources:
 * https://github.com/Dynamsoft/javascript-barcode
 * https://docs.scandit.com/4.3/web/index.html
 */
const ZBar = {
    lastGrowTimestamp: 0,

    SymbolTypes: {},
    ConfigTypes: {}
}

/**
 * Instance
 */

ZBar.GetInstance = async function () {
    // TODO::: Check and fix not call in app start!
    // console.log("Called")
    if (!ZBar.Instance) {
        let HEAP32 = new Int32Array()

        const clock_gettime = (clk_id, tp) => {
            const now = Date.now()
            HEAP32[tp >> 2] = (now / 1e3) | 0
            HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0
            return 0
        }

        const emscripten_notify_memory_growth = (idx) => {
            if (ZBar.lastGrowTimestamp) {
                console.info('zbar.wasm: Memory Grow: ', ZBar.Instance.memory.buffer.byteLength)
            }
            ZBar.lastGrowTimestamp = Date.now()
            HEAP32 = new Int32Array(ZBar.Instance.memory.buffer)
        }

        const importObj = {
            env: {
                clock_gettime,
                emscripten_notify_memory_growth
            }
        }

        // Load related WASM file
        try {
            const output = await WebAssembly.instantiateStreaming(fetch('zbar-v0.wasm'), importObj)
            ZBar.Instance = output.instance.exports
            emscripten_notify_memory_growth(0)
        } catch (err) {
            // TODO::: toast better error text for non IT experts!
            errors.HandleError(err)
            return
        }
    }
    return ZBar.Instance
}

ZBar.GetMemoryGrowTimestamp = function () {
    return ZBar.lastGrowTimestamp
}

/**
 * C++ interface
 */
class CppObject {
    constructor(ptr, inst) {
        this.ptr = ptr
        this.inst = inst
    }
    checkAlive() {
        if (this.ptr)
            return
        throw Error('Call after destroyed')
    }
    getPointer() {
        this.checkAlive()
        return this.ptr
    }
}

/**
 * Image Scanner
 */
class ImageScanner extends CppObject {
    static async create() {
        const inst = await ZBar.GetInstance()
        const ptr = inst.ImageScanner_create()
        return new this(ptr, inst)
    }
    destroy() {
        this.checkAlive()
        this.inst.ImageScanner_destory(this.ptr)
        this.ptr = 0
    }
    setConfig(sym, conf, value) {
        this.checkAlive()
        return this.inst.ImageScanner_set_config(this.ptr, sym, conf, value)
    }
    enableCache(enable = true) {
        this.checkAlive()
        this.inst.ImageScanner_enable_cache(this.ptr, enable)
    }
    recycleImage(image) {
        this.checkAlive()
        this.inst.ImageScanner_recycle_image(this.ptr, image.getPointer())
    }
    getResults() {
        this.checkAlive()
        const res = this.inst.ImageScanner_get_results(this.ptr)
        return ZBarSymbol.createSymbolsFromPtr(res, this.inst.memory.buffer)
    }
    /**
     * 
     * @param {Image} image 
     */
    scan(image) {
        this.checkAlive()
        return this.inst.ImageScanner_scan(this.ptr, image.getPointer())
    }
}

/**
 * Image
 */
class Image extends CppObject {
    static async createFromGrayBuffer(width, height, dataBuf, sequence_num = 0) {
        const inst = await ZBar.GetInstance()
        const heap = new Uint8Array(inst.memory.buffer)
        const data = new Uint8Array(dataBuf)
        const len = width * height
        if (len !== data.byteLength) {
            throw Error('dataBuf does not match width and height')
        }
        const buf = inst.malloc(len)
        heap.set(data, buf)
        const ptr = inst.Image_create(width, height, 0x30303859 /* Y800 */, buf, len, sequence_num)
        return new this(ptr, inst)
    }
    static async createFromRGBABuffer(width, height, dataBuf, sequence_num = 0) {
        const inst = await ZBar.GetInstance()
        const heap = new Uint8Array(inst.memory.buffer)
        const data = new Uint8Array(dataBuf)
        const len = width * height
        if (len * 4 !== data.byteLength) {
            throw Error('dataBuf does not match width and height')
        }
        const buf = inst.malloc(len)
        for (let i = 0; i < len; ++i) {
            const r = data[i * 4]
            const g = data[i * 4 + 1]
            const b = data[i * 4 + 2]
            heap[buf + i] = (r * 19595 + g * 38469 + b * 7472) >> 16
        }
        const ptr = inst.Image_create(width, height, 0x30303859 /* Y800 */, buf, len, sequence_num)
        return new this(ptr, inst)
    }
    destroy() {
        this.checkAlive()
        this.inst.Image_destory(this.ptr)
        this.ptr = 0
    }
    getSymbols() {
        this.checkAlive()
        const res = this.inst.Image_get_symbols(this.ptr)
        return ZBarSymbol.createSymbolsFromPtr(res, this.inst.memory.buffer)
    }
}


/**
 * ZBar Type Pointer ...
 */
class ZBarTypePointer {
    constructor(ptr, buf) {
        this.ptr = ptr
        this.ptr32 = ptr >> 2
        this.buf = buf
        this.HEAP8 = new Int8Array(buf)
        this.HEAPU32 = new Uint32Array(buf)
        this.HEAP32 = new Int32Array(buf)
    }
}

/**
 * ZBar Symbol Pointer ...
 */
class ZBarSymbolPtr extends ZBarTypePointer {
    get type() {
        return this.HEAPU32[this.ptr32]
    }
    get data() {
        const len = this.HEAPU32[this.ptr32 + 2]
        const ptr = this.HEAPU32[this.ptr32 + 3]
        return Int8Array.from(this.HEAP8.subarray(ptr, ptr + len))
    }
    get points() {
        const len = this.HEAPU32[this.ptr32 + 5]
        const ptr = this.HEAPU32[this.ptr32 + 6]
        const ptr32 = ptr >> 2
        const res = []
        for (let i = 0; i < len; ++i) {
            const x = this.HEAP32[ptr32 + i * 2]
            const y = this.HEAP32[ptr32 + i * 2 + 1]
            res.push({ x, y })
        }
        return res
    }
    get next() {
        const ptr = this.HEAPU32[this.ptr32 + 8]
        if (!ptr)
            return null
        return new ZBarSymbolPtr(ptr, this.buf)
    }
    get time() {
        return this.HEAPU32[this.ptr32 + 10]
    }
    get cacheCount() {
        return this.HEAP32[this.ptr32 + 11]
    }
    get quality() {
        return this.HEAP32[this.ptr32 + 12]
    }
}

/**
 * ZBar Symbol Set Pointer ...
 */
class ZBarSymbolSetPtr extends ZBarTypePointer {
    get head() {
        const ptr = this.HEAPU32[this.ptr32 + 2]
        if (!ptr)
            return null
        return new ZBarSymbolPtr(ptr, this.buf)
    }
}

/**
 * ZBar Symbol ...
 */
class ZBarSymbol {
    constructor(ptr) {
        this.type = ptr.type
        this.data = ptr.data
        this.points = ptr.points
        this.time = ptr.time
        this.cacheCount = ptr.cacheCount
        this.quality = ptr.quality
    }
    static createSymbolsFromPtr(ptr, buf) {
        if (ptr == 0)
            return []
        const set = new ZBarSymbolSetPtr(ptr, buf)
        let symbol = set.head
        const res = []
        while (symbol !== null) {
            res.push(new ZBarSymbol(symbol))
            symbol = symbol.next
        }
        return res
    }
    decode(encoding) {
        const decoder = new TextDecoder(encoding)
        return decoder.decode(this.data)
    }
    typeName() {
        switch (this.type) {
            case ZBar.SymbolTypes.NONE:
                return "None"
            case ZBar.SymbolTypes.PARTIAL:
                return "PARTIAL"
            case ZBar.SymbolTypes.EAN8:
                return "EAN8"
            case ZBar.SymbolTypes.UPCE:
                return "UPCE"
            case ZBar.SymbolTypes.ISBN10:
                return "ISBN10"
            case ZBar.SymbolTypes.UPCA:
                return "UPCA"
            case ZBar.SymbolTypes.EAN13:
                return "EAN13"
            case ZBar.SymbolTypes.ISBN13:
                return "ISBN13"
            case ZBar.SymbolTypes.I25:
                return "I25"
            case ZBar.SymbolTypes.CODE39:
                return "CODE39"
            case ZBar.SymbolTypes.PDF417:
                return "PDF417"
            case ZBar.SymbolTypes.QRCODE:
                return "QRCODE"
            case ZBar.SymbolTypes.CODE128:
                return "CODE128"
            case ZBar.SymbolTypes.SYMBOL:
                return "SYMBOL"
            case ZBar.SymbolTypes.ADDON2:
                return "ADDON2"
            case ZBar.SymbolTypes.ADDON5:
                return "ADDON5"
            case ZBar.SymbolTypes.ADDON:
                return "ADDON"
        }
    }
}

/**
 * Exports ZBar methods
 */

ZBar.defaultScannerPromise = ImageScanner.create()

ZBar.GetDefaultScanner = async function () {
    return await ZBar.defaultScannerPromise
}

/**
 * 
 * @param {Image} image 
 * @param {ImageScanner} scanner 
 */
ZBar.ScanImage = async function (image, scanner) {
    const res = scanner.scan(image)
    if (res <= 0) return []
    return image.getSymbols()
}

ZBar.ScanGrayBuffer = async (buffer, width, height, scanner) => {
    const image = await Image.createFromGrayBuffer(width, height, buffer)
    const res = await ZBar.ScanImage(image, scanner)
    image.destroy()
    return res
}

ZBar.ScanRGBABuffer = async (buffer, width, height, scanner) => {
    const image = await Image.createFromRGBABuffer(width, height, buffer)
    const res = await ZBar.ScanImage(image, scanner)
    image.destroy()
    return res
}

/**
 * ZBar Symbol Types
 */
ZBar.SymbolTypes.NONE = 0 // no symbol decoded
ZBar.SymbolTypes.PARTIAL = 1 // intermediate status
ZBar.SymbolTypes.EAN8 = 8 // EAN-8
ZBar.SymbolTypes.UPCE = 9 // UPC-E
ZBar.SymbolTypes.ISBN10 = 10 // ISBN-10 (from EAN-13). @since 0.4
ZBar.SymbolTypes.UPCA = 12 // UPC-A
ZBar.SymbolTypes.EAN13 = 13 // EAN-13
ZBar.SymbolTypes.ISBN13 = 14 // ISBN-13 (from EAN-13). @since 0.4
ZBar.SymbolTypes.I25 = 25 // Interleaved 2 of 5. @since 0.4
ZBar.SymbolTypes.CODE39 = 39 // Code 39. @since 0.4
ZBar.SymbolTypes.PDF417 = 57 // PDF417. @since 0.6
ZBar.SymbolTypes.QRCODE = 64 // QR Code. @since 0.10
ZBar.SymbolTypes.CODE128 = 128 // Code 128
ZBar.SymbolTypes.SYMBOL = 255 // 0x00ff     mask for base symbol type
ZBar.SymbolTypes.ADDON2 = 512 // 0x0200     2-digit add-on flag
ZBar.SymbolTypes.ADDON5 = 1280 // 0x0500    5-digit add-on flag
ZBar.SymbolTypes.ADDON = 1792 // 0x0700     add-on flag mask

/**
 * ZBar Config Types
 */
ZBar.ConfigTypes.ENABLE = 0 // enable symbology/feature 
ZBar.ConfigTypes.ADD_CHECK = 1 // enable check digit when optional 
ZBar.ConfigTypes.EMIT_CHECK = 2 // return check digit when present 
ZBar.ConfigTypes.ASCII = 3 // enable full ASCII character set 
ZBar.ConfigTypes.NUM = 4 // number of boolean decoder configs 

ZBar.ConfigTypes.MIN_LEN = 32 // 0x20   minimum data length for valid decode 
ZBar.ConfigTypes.MAX_LEN = 33 //        maximum data length for valid decode 

ZBar.ConfigTypes.UNCERTAINTY = 64 // 0x40   required video consistency frames 

ZBar.ConfigTypes.POSITION = 128 // 0x80     enable scanner to collect position data 

ZBar.ConfigTypes.X_DENSITY = 256 // 0x100   image scanner vertical scan density 
ZBar.ConfigTypes.Y_DENSITY = 257 //         image scanner horizontal scan density
