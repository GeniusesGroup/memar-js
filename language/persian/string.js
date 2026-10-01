/* For license and copyright information please see LEGAL file in repository */

import { EnglishToPersianDigits, PersianToEnglishDigits } from './digit.js'
import { NumberToPersianLetter } from './letter.js'

String.prototype.DigitsToPersian = function () {
    return this.replace(/[0-9]/g, EnglishToPersianDigits)
}

String.prototype.DigitsToEnglish = function () {
    return this.replace(/[^0-9.]/g, PersianToEnglishDigits)
}

String.prototype.AsPersianDigit = function () {
    return EnglishToPersianDigits(this)
}

String.prototype.AsEnglishDigits = function (num) {
    return PersianToEnglishDigits(this)
}

String.prototype.DigitsToPersianLetter = function () {
    // return this.replace(/[0-9]/g, NumberToPersianLetter)
}

String.prototype.AsPersianLetter = function () {
    return NumberToPersianLetter(this)
}
