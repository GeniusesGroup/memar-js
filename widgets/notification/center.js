/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 */
const centerNotificationWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "notification-center",
    },
    Conditions: {},
    HTML: (details) => ``,
    CSS: '',
    Templates: {},
    Queue: [],
}
Application.RegisterWidget(centerNotificationWidget)

/**
 * 
 * @param {object} options 
 */
centerNotificationWidget.ConnectedCallback = function (options) {
    this.popUpElement = document.createElement("div")
    this.popUpElement.id = "pop-up-widget"
    document.documentElement.appendChild(this.popUpElement)

    const popUpNotificationWidgetStyle = document.createElement("style")
    popUpNotificationWidgetStyle.id = "pop-up-widget-style"
    popUpNotificationWidgetStyle.innerHTML = this.CSS
    document.head.appendChild(popUpNotificationWidgetStyle)
}

centerNotificationWidget.DisconnectedCallback = function () {
}

/**
 * 
 * @param {string} title 
 * @param {string} message 
 * @param {string} type 
 */
centerNotificationWidget.New = function (title, message, type) {

}

const centerNotificationWidgetTypeInfo = 0
const centerNotificationWidgetTypeWarning = 1
const centerNotificationWidgetTypeError = 2
const centerNotificationWidgetTypeSuccess = 3
