/* For license and copyright information please see LEGAL file in repository */

const widgets = {
    poolByID: {}
}

/**
 * register given page in pages.poolByID and call page.Init() to initialize page.
 * @param {object} widget 
 */
widgets.RegisterWidget = function(widget) {
    this.poolByID[widget.ID] = widget
}
