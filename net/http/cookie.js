/* For license and copyright information please see LEGAL file in repository */

const cookie = {}

// HTTP Cookie some names and
const HTTPCookieNameBaseUserID = "B"  // any of users type ID indicate in Achaemenid.HTTPConnAllowBaseUsers
const HTTPCookieNameBaseConnID = "BC" // Achaemenid Base Connection ID
const HTTPCookieNameDelegateUserID = "D"  // Any User Type ID
const HTTPCookieNameDelegateConnID = "DC" // Achaemenid Delegate Connection ID
const HTTPCookieNameThingID = "T"  // Achaemenid Thing ID

cookie.GetByName = function (name) {
    const cookiesParts = document.cookie.split('; ')
    for (let cookie of cookiesParts) {
        let firstEqualIndex = cookie.indexOf('=')
        if (cookie.slice(0, firstEqualIndex) === name) return cookie.slice(firstEqualIndex + 1)
    }
    return ""
}

cookie.RemoveByName = function (name) {
    document.cookie = name + "=; Max-Age=1"
}

/**
 * @typedef {Object} Cookie is the request structure of SetCookie() method of cookie const!
 * @property {string} Path
 * @property {string} Domain
 * @property {string} Expires
 * @property {string} MaxAge
 * @property {boolean} HTTPOnly
 * @property {boolean} Secure
 * @property {string} SameSite
 */

/**
 * 
 * @param {Cookie} cookie 
 */
cookie.SetCookie = function (cookie) {
    let marshaledCookie = cookie.Name + "=" + cookie.Value

    if (cookie.Path && cookie.Path.length > 0) {
        marshaledCookie += "; Path=" + cookie.Path
    }
    if (cookie.Domain && cookie.Domain.length > 0) {
        marshaledCookie += "; Domain=" + cookie.Domain
    }
    if (cookie.Expires && cookie.Expires.length > 0) {
        marshaledCookie += "; Expires=" + cookie.Expires
    }
    if (cookie.MaxAge && cookie.MaxAge.length > 0) {
        marshaledCookie += "; Max-Age=" + cookie.MaxAge
    }
    if (cookie.HTTPOnly) {
        marshaledCookie += "; HttpOnly"
    }
    if (cookie.Secure) {
        marshaledCookie += "; Secure"
    }
    if (cookie.SameSite && cookie.SameSite.length > 0) {
        marshaledCookie += "; SameSite=" + cookie.SameSite
    }

    document.cookie = marshaledCookie
}
