/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 * @returns {URLSearchParams}
 */
window.location.Query = function() {
    if (!this.query) {
        this.query = new URLSearchParams(window.location.search)
    }
    return this.query
}

window.location.GetLanguageRegion = function () {
    const hl = this.Query().get('hl')
    let hlParts = ["", ""]
    if (hl) hlParts = hl.split("-")
    return {
        l: hlParts[0],
        r: hlParts[1]
    }
}
