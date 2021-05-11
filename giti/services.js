/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Giti.Services = {
    poolByID: {},
    poolByURN: {}
}

/**
 * register given service in many ways such as register in PoolByID
 * @param {Service} service 
 */
Giti.Services.RegisterService = function (service) {
    this.poolByID[service.ID] = service
    this.poolByURN[service.URN] = service
}

Giti.Services.GetByID = function (id) {
    return this.poolByID[id]
}

Giti.Services.GetByURN = function (urn) {
    return this.poolByURN[urn]
}

Giti.Services.CallByID = function (id, req) {
    return this.poolByID[id].HTTPHandler(req)
}

Giti.Services.CallByURN = function (urn, req) {
    return this.poolByURN[urn].HTTPHandler(req)
}
