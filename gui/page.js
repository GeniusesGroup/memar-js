/* For license and copyright information please see LEGAL file in repository */

import * as mediatype from "../mediatype"

/**
 * See https://github.com/GeniusesGroup/libgo/blob/main/protocol/gui-page.go GUIPage interface for comments
 */
class Page extends mediatype.MediaType {
    Robots() { return this._robots }
    Icon() { return this._icon }
    Info() { return this._info }
    RelatedPages() { return this._relatedPages }

    Path() { return this._path } // page url path for routing
    AcceptedCondition(key) { return this._acceptedConditions[key] }

    ActiveState() { return this._activateState }
    ActiveStates() { return this._activateStates }

    // HTML: () => ``,
    // CSS: '',
    // Templates: {},
}
