/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Application.errors = {
    poolByID: {},
    poolByURN: {}
}

/**
 * 
 * @param {GitiError} persiaError 
 */
Application.errors.addError = function(persiaError) {
    this.poolByID[id] = persiaError
    this.poolByURN[urn] = persiaError

}

/**
 * 
 * @param {string} id ID of desire error
 * @return {GitiError} persiaError 
 */
Application.GetErrorByID = function (id) {
    return this.errors.poolByID[id]
}

/**
 * 
 * @param {string} urn URN of desire error
 * @return {GitiError} persiaError 
 */
Application.GetErrorByURN = function (urn) {
    return this.errors.poolByURN[urn]
}
