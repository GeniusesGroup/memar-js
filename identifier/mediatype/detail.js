/* For license and copyright information please see LEGAL file in repository */

/**
 * See https://github.com/GeniusesGroup/libgo/blob/main/protocol/media-type.go MediaTypeDetail interface for comments
 */
class MediaTypeDetail {
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
    constructor(lang, domain, summary, overview, userNote, devNote, tags) {
        this._name = 'Memar MediaType Detail'
        this._language = lang
        this._domain = domain
        this._summary = summary
        this._overview = overview
        this._userNote = userNote
        this._devNote = devNote
        this._tags = tags
    }

    Name() { return this._name }
    Language() { return this._language }
    Domain() { return this._domain }
    Summary() { return this._summary }
    Overview() { return this._overview }
    UserNote() { return this._userNote }
    DevNote() { return this._devNote }
    Tags() { return this._tags }
}
