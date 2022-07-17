/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 * @return {Err} response error 
 */
Response.prototype.GetError = function () {
    const errID = this.headers.get(HeaderKeyErrorID)
    const err = Application.GetErrorByID(errID)
    // console.log("{{.Name}}", this, errID, err)
    return err
}

/**
 * 
 * @param {Err} err 
 */
Response.prototype.SetError = function (err) {
    this.headers.set(HeaderKeyErrorID, err.ID())
}

/**
 * syllab decoder method like json() method.
 */
 Response.prototype.ToSyllab = function() {

}
