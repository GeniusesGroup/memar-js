/* For license and copyright information please see LEGAL file in repository */

Request.prototype.GetService = function () {
    const requestURL = new URL(this.url)
    const serviceID = requestURL.search.slice(1)
    const service = Application.GetServiceByID(serviceID)
    // console.log("Service Called: ", this, serviceID, service)
    return service
}
