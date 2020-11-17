/* For license and copyright information please see LEGAL file in repository */

import './math.js'

math.PerCent.GetAsPerMyriad = function (num) {
    return Math.round(num * 100)
}

/**
 * Calculate return PerCent of given number.
 * @param {number} num 
 * @param {number} PerMyriad 
 */
math.PerCent.Calculate = function (num, percent) {
    return (num * percent) / 100
}

/**
 * Calculate and return PerCent of given first number by second number
 * @param {number} firstNum 
 * @param {number} secNum 
 */
math.PerCent.Get = function (firstNum, secNum) {
    return (firstNum * 100) / secNum
}

/**
 * Calculate and return reverse PerCent of given first number by second number
 * @param {number} firstNum 
 * @param {number} secNum 
 */
math.PerCent.GetReverse = function (firstNum, secNum) {
    return 100 - ((firstNum * 100) / secNum)
}
