/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Application.errors = {
    _poolByID: {},
    _poolByMediaType: {}
}

/**
 * 
 * @param {Err} err 
 */
Application.RegisterError = function (err) {
    this._poolByID[id] = err
    this._poolByMediaType[urn] = err
}

/**
 * 
 * @param {string} id ID of desire error
 * @return {Err} related error by given id, if exist
 */
Application.GetErrorByID = function (id) {
    return this.errors._poolByID[id]
}

/**
 * 
 * @param {string} mt MediaType of desire error
 * @return {Err} related error by given mt, if exist 
 */
Application.GetErrorByMediaType = function (mt) {
    return this.errors._poolByMediaType[mt]
}
