/* For license and copyright information please see LEGAL file in repository */

const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const persianNumbersToEnglish = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' }

function EnglishToPersianDigits(num) {
    return persianNumbers[num]
}

function PersianToEnglishDigits(num) {
    // TODO::: other solution: https://stackoverflow.com/a/58157015/8285181
    // const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    return persianNumbersToEnglish[num] || num
}
