/* For license and copyright information please see LEGAL file in repository */

HTMLButtonElement.prototype.toggle = function () {
    if (this.checked === true) {
        this.toggleAttribute("checked")
        this.checked = false
    } else {
        this.toggleAttribute("checked")
        this.checked = true
    }
}
