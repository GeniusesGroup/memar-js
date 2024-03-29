
/* For license and copyright information please see LEGAL file in repository */
// Auto-generated, edits will be overwritten

Application.RegisterService({
    URN: "urn:giti:achaemenid.protocol:service:set-connection-thing-id",
    ID: 3530667464632943931,
    IssueDate: 1604844006,
    ExpireDate: 0,
    ExpireInFavorOfURN: "",
    ExpireInFavorOfID: 0,
    Status: SoftwareStatePerpetualBeta, // https://en.wikipedia.org/wiki/Software_release_life_cycle

    Authorization: {
        CRUD: CRUDCreate,
        UserType: UserTypeAll,
    },

    Name: "LocaleText[0]",
    Description: "LocaleText[1]",
    TAGS: [
        "",
    ],

    DoHTTP: SetConnectionThingID,
})

/**
 * @typedef {Object} SetConnectionThingIDReq is the request structure of GetProductAuction()
 * @property {string} ThingID [32]byte that encode||decode as base64
 */

/**
 * 
 * @param {SetConnectionThingIDReq} req
 */
async function SetConnectionThingID(req) {
    const httpReq = new Request('/m?3530667464632943931', {
        method: MethodPOST,
        // compress: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })

    try {
        var httpRes = await fetch(httpReq)
    } catch (err) {
        throw Err.ConvertToErr(err)
    }

    switch (httpRes.status) {
        case 200:
        case 201:
            return
        case 400:
        case 500:
        default:
            throw httpRes.GetError()
    }
}
