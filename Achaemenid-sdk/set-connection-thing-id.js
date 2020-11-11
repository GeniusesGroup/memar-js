
/* For license and copyright information please see LEGAL file in repository */
// Auto-generated, edits will be overwritten

import '../authorization.js'
import '../services.js'

services.poolByID[2832289121] = {
    ID: 2832289121,
    CRUD: CRUDCreate,
    IssueDate: 1604844006,
    ExpireDate: 0,
    ExpireInFavorOf: "",
    ExpireInFavorOfID: 0,
    Status: ServiceStatePerpetualBeta, // https://en.wikipedia.org/wiki/Software_release_life_cycle

	Name: "LocaleText[0]",
	Description: "LocaleText[1]",
    TAGS: [
		"",
	],

    HTTPHandler: SetConnectionThingID,
}

/**
 * This service just valid until TCP||UDP support
 * @param {object} req 
 * 
 * Usage - copy below and edit as usage:
 * 
	// SetConnectionThingIDReq is the request structure of SetConnectionThingID()
	const SetConnectionThingIDReq = {
		"ThingID": "", // [32]byte that encode||decode as base64
	}
	SetConnectionThingID(SetConnectionThingIDReq)
		.catch(err => {
			// Handle error situation here
			console.log(err)
		})

 * Also you can use "async function (){ try{await func()}catch (err){} }" instead "func(req).then(res).catch(err)"
 */
async function SetConnectionThingID(req) {
	// TODO::: First check cache if service responses cache-able before send to apis server!

    // TODO::: Second validate req before send to apis server!

    const request = new Request('/apis?2832289121', {
        method: "POST",
        // compress: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })

	let res = await fetch(request)

	switch (res.status) {
		case 200:
		case 201:
			return null
		case 400:
		case 500:
		default:
			throw res.headers.get(HeaderKeyErrorID)
	}
}
