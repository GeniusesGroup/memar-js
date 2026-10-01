/* For license and copyright information please see LEGAL file in repository */

// https://github.com/zloirock/core-js

// This polyfill tries to stick as close to the spec as possible. There are polyfills which could use less code.
Object.defineProperty(Array.prototype, 'LastItem', {
    enumerable: false,
    configurable: false,
    get() {
        let O = ToObject(this)
        let len = ToLength(O.length)
        if (len === 0) {
            return undefined
        } else if (len > 0) {
            len = len - 1
            let index = ToString(len)
            let element = O[index]
            return element
        }
    },
    set(value) {
        let O = ToObject(this)
        let len = ToLength(O.length)
        if (len > 0) {
            len = len - 1
        }
        let index = ToString(len)
        return O[index] = value
    },
})
Object.defineProperty(Array.prototype, 'LastIndex', {
    enumerable: false,
    configurable: false,
    get() {
        let O = ToObject(this)
        let len = ToLength(O.length)
        if (len > 0) {
            return len - 1
        }
        return 0
    },
})
