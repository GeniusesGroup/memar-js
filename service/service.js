/* For license and copyright information please see LEGAL file in repository */

/**
 * The service structure
 * @property {string} Domain
 * @property {bigint} ID
 * @property {bigint} IssueDate
 * @property {bigint} ExpireDate
 * @property {string} ExpireInFavorOf
 * @property {bigint} ExpireInFavorOfID
 * @property {string} Status https://en.wikipedia.org/wiki/Software_release_life_cycle
 * @property {Authorization} Authorization
 * @property {string} Name 
 * @property {string} Description
 * @property {string[]} TAGS
 * 
 * @property {function} ServeHTTP GetProduct

 * @typedef {Object} Authorization is the service structure
 * @property {number} CRUDRead
 * @property {number} UserType_All UserTypeOwner
 */
const Service = {
    URN: {
        URN: "",
        ID: "",
        Domain: "",
        Scope: "service",
        Name: "",
    },
    ID: 0,
    IssueDate: 0,
    ExpireDate: 0,
    ExpireInFavorOfURN: "",
    ExpireInFavorOfID: 0,
    Status: 0, // e.g. Software_PreAlpha more on https://en.wikipedia.org/wiki/Software_release_life_cycle

    Authorization: {
        CRUD: CRUDRead,
        UserType: UserType_All, // UserTypeOwner
    },

    Detail: {
        Name: "Service Name",
        Description: "Service Description",
        TAGS: [],
    },

    DoHTTP: null,
}
