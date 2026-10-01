/* For license and copyright information please see LEGAL file in repository */

import { NumberToPersianLetter } from '../persian/letter.js'

Number.prototype.AsPersianLetter = function () {
    return NumberToPersianLetter(parseFloat(this).toString())
}
