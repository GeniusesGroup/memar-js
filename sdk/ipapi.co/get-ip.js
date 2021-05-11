
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
    URN: "urn:giti:ipapi.com:service:get-ip",
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
 * @property {string} ip "51.178.166.133"
 * @property {string} version "IPv4"
 * @property {string} city "Roubaix"
 * @property {string} region "Hauts-de-France"
 * @property {string} region_code "HDF"
 * @property {string} country "FR"
 * @property {string} country_name "France"
 * @property {string} country_code "FR"
 * @property {string} country_code_iso3 "FRA"
 * @property {string} country_capital "Paris"
 * @property {string} country_tld ".fr"
 * @property {string} continent_code "EU"
 * @property {boolean} in_eu true
 * @property {string} postal null
 * @property {number} latitude 50.6974
 * @property {number} longitude 3.178
 * @property {string} timezone "Europe/Paris"
 * @property {string} utc_offset "+0200"
 * @property {string} country_calling_code "+33"
 * @property {string} currency "EUR"
 * @property {string} currency_name "Euro"
 * @property {string} languages "fr-FR,frp,br,co,ca,eu,oc"
 * @property {number} country_area 547030.0
 * @property {number} country_population 66987244.0
 * @property {string} asn "AS16276"
 * @property {string} org "OVH SAS"
 */

/**
 * 
 * @returns {GetIPRes}
 * @throws {GitiError} related error
 */
async function GetIP() {
    const httpReq = new Request('https://ipapi.co/json', {
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
