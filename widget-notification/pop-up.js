/* For license and copyright information please see LEGAL file in repository */

import '../widgets.js'

/**
 * 
 */
const popUpNotificationWidget = {
    ID: "notification-pop-up",
    Conditions: {
        Duration: 10000, // 10 sec
    },
    HTML: (details) => ``,
    CSS: '',
    Templates: {},
    Queue: [],
}
widgets.poolByID[popUpNotificationWidget.ID] = popUpNotificationWidget

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
 * @param {string} type 
 */
popUpNotificationWidget.New = function (title, message, type) {
    let details = {
        Title: title,
        Message: message,
        Type: type,
    }

    switch (type) {
        case "Info":
            details.Icon = "info"
            break
        case "Warning":
            details.Icon = "warning"
            break
        case "Error":
            details.Icon = "cancel"
            break
        case "Success":
            details.Icon = "done"
            break
        default:
            details.Icon = "notifications"
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
