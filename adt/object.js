/* For license and copyright information please see LEGAL file in repository */

/**
 * copyFrom use to copy an object by structure and values from other object!
 * @param {object} src
 */
Object.prototype.copyFrom = function (src) {
    /**
     * if conflict set to true it means copy objects have conflicts in all or some keys or values
     */
    let conflict = false

    for (let key in this) {
        if (typeof src[key] === "undefined") {
            conflict = true
            continue
        }

        if (typeof this[key] === 'object') {
            if (typeof src[key] !== 'object') {
                conflict = true
                continue
            }

            copyObject(src[key], this[key])
        } else {
            this[key] = src[key]
        }
    }

    return conflict
}
