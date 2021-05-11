
/* For license and copyright information please see LEGAL file in repository */
// Auto-generated, edits will be overwritten

import './init.js'
import '../../giti/services.js'
import '../../giti/service.js'
import '../../giti/error.js'
import '../../authorization/authorization.js'
import '../../authorization/crud.js'
import '../../authorization/user.js'
import '../../http/const.js'

Giti.Services.RegisterService({
    URN: "urn:giti:ip-api.com:service:get-ip",
    Domain: DomainName,
    ID: 1,
    IssueDate: 1604475115,
    ExpireDate: 0,
    ExpireInFavorOfURN: "",
    ExpireInFavorOfID: 0,
    Status: ServiceStatePreAlpha, // https://en.wikipedia.org/wiki/Software_release_life_cycle

    Authorization: {
        CRUD: CRUDRead,
        UserType: UserTypeAll,
    },

    Name: "LocaleText[0]",
    Description: "LocaleText[1]",
    TAGS: [
        "",
    ],

    HTTPHandler: GetIP,
})

/**
 * @typedef {Object} GetIPRes is the response structure of GetIP()
 * @property {string} status "success"
 * @property {string} country "Iran"
 * @property {string} countryCode "IR"
 * @property {string} region "23"
 * @property {string} regionName "Tehran"
 * @property {string} city "Tehran"
 * @property {string} zip ""
 * @property {number} lat 35.6892
 * @property {number} lon 51.389
 * @property {string} timezone "Asia/Tehran"
 * @property {string} isp "Respina"
 * @property {string} org ""
 * @property {string} as "AS42337 Dade Pardazi Respina PJSC"
 * @property {string} query "46.209.47.208"
 */

/**
 * 
 * @returns {GetIPRes}
 * @throws {GitiError} related error
 */
async function GetIP() {
    const httpReq = new Request('http://ip-api.com/json', {
        method: MethodGET,
        // compress: true,
        // credentials: 'same-origin',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
    })

    try {
        var httpRes = await fetch(httpReq)
    } catch (err) {
        throw Giti.Error.ConvertToGitiError(err)
    }

    switch (httpRes.status) {
        case 200:
            const contentType = httpRes.headers.get('content-type')
            switch (contentType) {
                case 'application/json':
                    try {
                        return await httpRes.json()
                    } catch (err) {
                        throw Giti.Error.ConvertToGitiError(err)
                    }
                default:
                    throw Giti.Errors.GetByURN("urn:giti:http.libgo:error:unsupported-media-type")
            }
        case 400:
            throw Giti.Error.ConvertToGitiError("400 error occurred")
        case 403:
            throw Giti.Error.ConvertToGitiError("403 error occurred")
        case 500:
            throw Giti.Error.ConvertToGitiError("500 error occurred")
        default:
            throw Giti.Error.ConvertToGitiError("Unknown error occurred")
    }
}
