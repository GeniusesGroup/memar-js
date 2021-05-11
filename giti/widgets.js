/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Giti.Widgets = {
    poolByID: {}
}

/**
 * register given widget in giti
 * @param {object} widget 
 */
Giti.Widgets.RegisterWidget = function (widget) {
    this.poolByID[widget.ID] = widget
}

Giti.Widgets.GetByID = function (id) {
    return this.poolByID[id]
}
