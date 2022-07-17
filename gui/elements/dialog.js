/* For license and copyright information please see LEGAL file in repository */

document.activeDialogElement = null

HTMLDialogElement.prototype.toggle = function () {
    if (this.open == true) {
        this.close()
        document.activeDialogElement = null

        // document.removeEventListener("click", HTMLDialogElement.prototype.handleBackdropClick)
    } else {
        if (this.getAttribute("type") === "modal") this.showModal()
        else this.show()
        document.activeDialogElement = this

        // const onBackdropClick = this.getAttribute("onBackdropClick")
        // if (onBackdropClick) {
        //     this.onBackdropClick = onBackdropClick
        //     time.Sleep(1000)
        //     document.addEventListener("click", HTMLDialogElement.prototype.handleBackdropClick)
        // }
    }
}

HTMLDialogElement.prototype.handleBackdropClick = function (event) {
    const onBackdropClick = document.activeDialogElement.onBackdropClick
    if (onBackdropClick) {
        console.log(event)
        console.log(document.activeDialogElement.contains(event.target))
        console.log(event.target.closest("dialog"))
        if (!document.activeDialogElement.contains(event.target)) { // or use: event.target.closest(selector) === null
            const funcName = onBackdropClick.split("this.")
            if (funcName.length = 2) {
                document.activeDialogElement[funcName[1]]()
            } else {
                window[onBackdropClick]()
            }
        }
    }
}
