/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Giti.Platforms = {
    poolByDomains: {},
}

/**
 * register the platform by its given domain
 * @param {string} domain 
 */
Giti.Platforms.RegisterPlatform = function (domain) {
    this.PoolByDomains[domain] = Services
}

/**
 * register given service in many ways such as register in PoolByID
 * @param {Service} service 
 */
Giti.Platforms.RegisterService = function (service) {
    this.PoolByDomains[service.Domain].PoolByID[service.ID] = service
}
