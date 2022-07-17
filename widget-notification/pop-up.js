/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 */
const popUpNotificationWidget = {
    URN: {
        URN: "",
        ID: "",
        Name: "notification-pop-up",
    },
    Conditions: {
        Duration: 10000, // 10 sec
    },
    HTML: (details) => ``,
    CSS: '',
    Templates: {},
    Queue: [],
}
Application.RegisterWidget(popUpNotificationWidget)

/**
 * 
 * @param {object} options 
 */
popUpNotificationWidget.ConnectedCallback = function (options) {
    this.popUpElement = document.createElement("div")
    this.popUpElement.id = "pop-up-widget"
    document.documentElement.appendChild(this.popUpElement)

    const popUpNotificationWidgetStyle = document.createElement("style")
    popUpNotificationWidgetStyle.id = "pop-up-widget-style"
    popUpNotificationWidgetStyle.innerHTML = this.CSS
    document.head.appendChild(popUpNotificationWidgetStyle)

    if (options.Duration) this.Conditions.Duration = options.Duration
}

popUpNotificationWidget.DisconnectedCallback = function () {
}

/**
 * 
 * @param {string} title 
 * @param {string} message 
 * @param {number} type send one of the const in end of this file
 */
popUpNotificationWidget.New = function (title, message, type) {
    let details = {
        Title: title,
        Message: message,
        Type: type,
    }

    switch (type) {
        case popUpNotificationWidgetTypeInfo:
            details.Icon = "info"
            details.TypeAsString = "Info"
            break
        case popUpNotificationWidgetTypeWarning:
            details.Icon = "warning"
            details.TypeAsString = "Warning"
            break
        case popUpNotificationWidgetTypeError:
            details.Icon = "cancel"
            details.TypeAsString = "Error"
            break
        case popUpNotificationWidgetTypeSuccess:
            details.Icon = "done"
            details.TypeAsString = "Success"
            break
        default:
            details.Icon = "notifications"
            details.TypeAsString = "Notifications"
            break
    }

    this.Queue.push(this.HTML(details))
    popUpNotificationWidget.Next()
}

popUpNotificationWidget.Next = function (timer) {
    if (timer) {
        popUpNotificationWidget.popUpElement.innerText = ""
    }

    if (!popUpNotificationWidget.popUpElement.innerHTML && popUpNotificationWidget.Queue.length !== 0) {
        popUpNotificationWidget.popUpElement.innerHTML = popUpNotificationWidget.Queue.shift()
        popUpNotificationWidget.ResetTimer()
    }
}

popUpNotificationWidget.ResetTimer = function () {
    setTimeout(popUpNotificationWidget.Next, popUpNotificationWidget.Conditions.Duration, true)
}

const popUpNotificationWidgetTypeInfo = 0
const popUpNotificationWidgetTypeWarning = 1
const popUpNotificationWidgetTypeError = 2
const popUpNotificationWidgetTypeSuccess = 3
