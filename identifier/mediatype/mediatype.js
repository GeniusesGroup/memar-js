/* For license and copyright information please see LEGAL file in repository */

import './errors.js'

class MediaType {
    /**
     * 
     * @param {string} id BigINT
     * @param {string} mediatype
     */
    constructor(id, mediatype) {
        this.Init(id, mediatype)
    }

    /**
     * New will make new MediaType, register it on related pools and return it
     * @param {string} id BigINT
     * @param {string} mediatype 
     */
    Init(id, mediatype) {
        this._name = 'Memar MediaType'
        this._id = id
        this._mediatype = mediatype
    }

    RegisterMediaType() { OS.RegisterMediaType(mt) }

    Name() { return this._name }
    ToString() { return this._mediatype }
    UUID() { return this._uuid }
    ID() { return this._id }
    IDasString() { return this._idAsString }
    MainType() { return this._mainType }
    Tree() { return this._tree }
    SubType() { return this._subType }
    Suffix() { return this._suffix }
    Parameters() { return this._parameters }
    FileExtension() { return this._fileExtension }
    Status() { return this._status }
    IssueDate() { return this._issueDate }
    ExpiryDate() { return this._expiryDate }
    ExpireInFavorOf() { return this._expireInFavorOf }
    Details() { return this._details }
    Detail(lang) { return this._details[lang] }
    Fields() { return this._fields }

    /**
     * 
     * @param {string} lang 
     * @param {string} domain 
     * @param {string} summary Summary return locale general summary error text that gives the main points in a concise form
     * @param {string} overview Overview return locale general error text that gives the main ideas without explaining all the details.
     * @param {string} userNote 
     * @param {string} devNote 
     * @param {string[]} tags 
     */
    SetDetail(lang, domain, summary, overview, userNote, devNote, tags) {
        this._details[lang] = new MediaTypeDetail(lang, domain, summary, overview, userNote, devNote, tags)
    }
}
