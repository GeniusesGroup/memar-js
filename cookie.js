/* For license and copyright information please see LEGAL file in repository */

const cookie = {}

cookie.GetByName = function (name) {
    const cookiesParts = document.cookie.split(';')
    for (let cookie of cookiesParts) {
        let firstEqualIndex = cookie.indexOf('=')
        if (cookie.slice(0, firstEqualIndex) === name) return cookie.slice(firstEqualIndex + 1)
    }
    return ""
}
