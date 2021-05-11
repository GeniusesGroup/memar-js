/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Giti.Errors = {
    poolByID: {},
    poolByURN: {}
}

/**
 * 
 * @param {string} id ID of desire error
 * @return {GitiError} persiaError 
 */
Giti.Errors.GetByID = function (id) {
    return this.poolByID[id]
}

/**
 * 
 * @param {string} urn URN of desire error
 * @return {GitiError} persiaError 
 */
Giti.Errors.GetByURN = function (urn) {
    return this.poolByURN[urn]
}
