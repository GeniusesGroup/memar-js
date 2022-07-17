/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 * https://www.w3.org/TR/wai-aria-practices/examples/toolbar/toolbar.html
 */
HTMLButtonElement.prototype.toggle = function () {
    if (this.checked === true) {
        this.toggleAttribute("checked")
        this.toggleAttribute("aria-pressed")
        this.toggleAttribute("aria-checked")
        this.checked = false
    } else {
        this.toggleAttribute("checked")
        this.toggleAttribute("aria-pressed")
        this.toggleAttribute("aria-checked")
        this.checked = true
    }
}
