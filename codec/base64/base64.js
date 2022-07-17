/* For license and copyright information please see LEGAL file in repository */

const base64 = {
    std: {},
    stdWithoutPadding: {},
    url: {},
    urlWithoutPadding: {},
}

base64.std.Encode = function (str) {
    return btoa(str)
}

base64.std.Decode = function (str) {
    return atob(str)
}

base64.stdWithoutPadding.Encode = function (str) {
    return btoa(str).replace("=", "")
}

base64.stdWithoutPadding.Decode = function (str) {
    return atob(str)
}

base64.stdWithoutPadding.HashTo32Byte = async function (pass) {
    const encoder = new TextEncoder()
    const passAsArray = encoder.encode(pass)
    const hash = await crypto.subtle.digest('SHA-256', passAsArray)
    return base64.stdWithoutPadding.Encode(String.fromCharCode(...new Uint8Array(hash)))
}

base64.url.Encode = function (str) {
    return btoa(str).replace("+", "-").replace("/", "_")
}

base64.url.Decode = function (str) {
    return atob(str.replace("-", "+").replace("_", "/"))
}

base64.urlWithoutPadding.Encode = function (str) {
    return btoa(str).replace("=", "").replace("+", "-").replace("/", "_")
}

base64.urlWithoutPadding.Decode = function (str) {
    return atob(str.replace("-", "+").replace("_", "/"))
}
