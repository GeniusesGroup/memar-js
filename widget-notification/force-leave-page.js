/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 * https://tools.ietf.org/html/bcp47
 */
const forceLeavePageWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "force-leave-page",
    },
    HTML: () => ``,
    CSS: '',
    Templates: {}
}
Application.RegisterWidget(forceLeavePageWidget)

forceLeavePageWidget.ConnectedCallback = async function () {
    if (!this.dialogElement) {
        this.dialogElement = window.document.createElement("div")
        this.dialogElement.innerHTML = this.HTML()
        const style = window.document.createElement("style")
        style.innerHTML = this.CSS
        this.dialogElement.appendChild(style)

        window.document.documentElement.appendChild(this.dialogElement)
    }

    document.getElementById('forceLeavePageDialog').toggle()

    while (this.forceLeave !== true && this.forceLeave !== false) {
        await time.Sleep(500)
    }

    document.getElementById('forceLeavePageDialog').toggle()
    let answer = this.forceLeave
    this.forceLeave = null
    return answer
}

forceLeavePageWidget.DisconnectedCallback = function () {
}
