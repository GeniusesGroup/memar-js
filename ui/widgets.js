/* For license and copyright information please see LEGAL file in repository */

Application.widgets = {
    poolByURNName: {}
}

/**
 * register given widget in giti
 * @param {object} widget 
 */
Application.RegisterWidget = function (widget) {
    this.widgets.poolByURNName[widget.URN.Name] = widget
}

Application.GetWidgetByURNName = function (urnName) {
    return this.widgets.poolByURNName[urnName]
}
