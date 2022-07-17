/* For license and copyright information please see LEGAL file in repository */

class PerCent {
    constructor(percent) {
        this._percent = percent
    }

    static Symbol() { return "%" }

    /**
     * Calculate and return PerCent of given first number by second number
     * @param {number} firstNum 
     * @param {number} secNum 
     */
    static Get = function (firstNum, secNum) {
        return (firstNum * 100) / secNum
    }

    /**
     * Calculate and return reverse PerCent of given first number by second number
     * @param {number} firstNum 
     * @param {number} secNum 
     */
    static GetReverse = function (firstNum, secNum) {
        return 100 - ((firstNum * 100) / secNum)
    }

    /**
     * Calculate return PerCent of given number.
     * @param {number} num 
     */
    Calculate(num) {
        return (num * this._percent) / 100
    }
    
    GetAsPerMyriad() {
        return Math.round(this._percent * 100)
    }
}
