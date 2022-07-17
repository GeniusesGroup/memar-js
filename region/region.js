/* For license and copyright information please see LEGAL file in repository */

import './regions.js'

const region = {
    poolByISO3166_1_num: {},
    poolByISO3166_1_a2: {},
    poolByISO3166_1_a3: {},
    poolByNativeName: {},
}

// function init() {
for (let r of Regions) {
    region.poolByISO3166_1_num[r.iso3166_1_num] = r
    region.poolByISO3166_1_a2[r.iso3166_1_a2] = r
    region.poolByISO3166_1_a3[r.iso3166_1_a3] = r
    region.poolByNativeName[r.nativeName] = r
}
// }

region.GetByNativeName = function (nativeName) {
    return this.poolByNativeName[nativeName]
}

region.GetSupportedByNativeName = function (nativeName) {
    const reg = this.poolByNativeName[nativeName]
    if (!reg) return null
    if (!Application.ContentPreferences.Regions.includes(reg.iso3166_1_a3)) return null
    return reg
}

region.GetAllAsOptions = function () {
    let options = ""
    for (let r of Regions) {
        options += `<option value="${r.nativeName}">${r.englishName}</option>`
    }
    return options
}

region.GetAppSupportedAsOptions = function () {
    let options = ""
    for (let r of Regions) {
        if (!Application.ContentPreferences.Regions.includes(r.iso3166_1_a3)) continue
        options += `<option value="${r.nativeName}">${r.englishName}</option>`
    }
    return options
}
