/* For license and copyright information please see LEGAL file in repository */

Application.services = {
    poolByID: {},
    poolByURN: {},
    poolByURI: {},
}

/**
 * register given service in many ways such as register in PoolByID
 * @param {Service} service 
 */
Application.RegisterService = function (service) {
    this.poolByID[service.ID] = service
    this.poolByURN[service.URN] = service
    this.poolByURI[service.URI] = service
}

/**
 * register given service in many ways such as register in PoolByID
 * @param {Service} service 
 */
Application.DeleteService = function (service) {
    delete this.poolByID[service.ID]
    delete this.poolByURN[service.URN]
    delete this.poolByURI[service.URI]
}

Application.GetServiceByID = function (id) {
    return this.services.poolByID[id]
}

Application.GetServiceByURN = function (urn) {
    return this.services.poolByURN[urn]
}

Application.GetServiceByURI = function (uri) {
    return this.services.poolByURI[uri]
}

Application.CallServiceByID = function (id, req) {
    return this.poolByID[id].ServeHTTP(req)
}

Application.CallServiceByURN = function (urn, req) {
    return this.poolByURN[urn].ServeHTTP(req)
}
