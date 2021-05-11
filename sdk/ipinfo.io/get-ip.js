
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
    URN: "urn:giti:ipinfo.io:service:get-ip",
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
 * @property {string} ip "46.209.47.208"
 * @property {string} city "Shiraz"
 * @property {string} region "Fars"
 * @property {string} country "IR"
 * @property {string} loc "29.6103,52.5311"
 * @property {string} org "AS42337 Dade Pardazi Respina PJSC"
 * @property {string} timezone "Asia/Tehran"
 * @property {string} readme "https://ipinfo.io/missingauth"
 */

/**
 * 
 * @returns {GetIPRes}
 * @throws {GitiError} related error
 */
async function GetIP() {
    const httpReq = new Request('https://ipinfo.io/json', {
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
