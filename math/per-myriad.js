/* For license and copyright information please see LEGAL file in repository */

class PerMyriad {
    constructor(perMyriad) {
        this._perMyriad = perMyriad
    }

    static Symbol() { return "‱" }

    /**
     * 
     * @param {number} firstNum 
     * @param {number} secNum 
     */
    static Get = function (firstNum, secNum) {
        return Math.round((firstNum * 10000) / secNum)
    }

    /**
     * 
     * @param {number} firstNum 
     * @param {number} secNum 
     */
    static GetReverse = function (firstNum, secNum) {
        return Math.round(10000 - ((firstNum * 10000) / secNum))
    }

    /**
     * Calculate return PerMyriad of given number.
     * @param {number} num
     */
    Calculate = function (num) {
        return (num * this._perMyriad) / 10000
    }

    GetAsPerCent = function (num) {
        num = num.toString()
        if (num.length === 1) return "00.0" + num
        if (num.length === 2) return "00." + num

        const start = num.substring(0, num.length - 2)
        const end = num.substring(num.length - 2)
        return start + "." + end
    }

    GetAsPerCentRound = function (num) {
        if (num < 50) return "0"
        if (num < 100) return "1"

        num = num.toString()
        const start = num.substring(0, num.length - 2)
        return start
    }
}
