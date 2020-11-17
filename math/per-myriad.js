/* For license and copyright information please see LEGAL file in repository */

import './math.js'

math.PerMyriad.GetAsPerCent = function (num) {
    num = num.toString()
    if (num.length === 1) return "00.0" + num
    if (num.length === 2) return "00." + num

    const start = num.substring(0, num.length - 2)
    const end = num.substring(num.length - 2)
    return start + "." + end
}

/**
 * Calculate return permyriad of given number.
 * @param {number} num 
 * @param {number} PerMyriad 
 */
math.PerMyriad.Calculate = function (num, PerMyriad) {
    return (num * PerMyriad) / 10000
}

/**
 * 
 * @param {number} firstNum 
 * @param {number} secNum 
 */
math.PerMyriad.Get = function (firstNum, secNum) {
    return Math.round((firstNum * 10000) / secNum)
}

/**
 * 
 * @param {number} firstNum 
 * @param {number} secNum 
 */
math.PerMyriad.GetReverse = function (firstNum, secNum) {
    return Math.round(10000 - ((firstNum * 10000) / secNum))
}
