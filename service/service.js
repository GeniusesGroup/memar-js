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
 * @property {number} UserTypeAll UserTypeOwner
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
    Status: 0, // e.g. ServiceStatePreAlpha more on https://en.wikipedia.org/wiki/Software_release_life_cycle

    Authorization: {
        CRUD: CRUDRead,
        UserType: UserTypeAll, // UserTypeOwner
    },

    Detail: {
        Name: "Service Name",
        Description: "Service Description",
        TAGS: [],
    },

    ServeHTTP: null,
}

/**
 * ServiceStatePreAlpha refers to all activities performed during the software project before formal testing.
 */
const ServiceStatePreAlpha = 0
/**
 * ServiceStateAlpha is the first phase to begin software testing
 */
const ServiceStateAlpha = 1
/**
 * ServiceStateBeta generally begins when the software is feature complete but likely to contain a number of known or unknown bugs.
 */
const ServiceStateBeta = 2
/**
 * ServiceStatePerpetualBeta where new features are continually added to the software without establishing a final "stable" release.
 * This technique may allow a developer to delay offering full support and responsibility for remaining issues.
 */
const ServiceStatePerpetualBeta = 3
/**
 * ServiceStateOpenBeta is for a larger group, or anyone interested.
 */
const ServiceStateOpenBeta = 4
/**
 * ServiceStateClosedBeta is released to a restricted group of individuals for a user test by invitation.
 */
const ServiceStateClosedBeta = 5
/**
 * ServiceStateReleaseCandidate also known as "going silver", is a beta version with potential to be a stable product,
 * which is ready to release unless significant bugs emerge
 */
const ServiceStateReleaseCandidate = 6
/**
 * ServiceStateStableRelease Also called production release,
 * the stable release is the last release candidate (RC) which has passed all verifications / tests.
 */
const ServiceStateStableRelease = 7
/**
 * ServiceStateEndOfLife indicate no longer supported and continue its existence until to ExpiryDate!
 */
const ServiceStateEndOfLife = 8

/**
 * return service status short detail text by https://en.wikipedia.org/wiki/Software_release_life_cycle
 * @param {number} id 
 */
Service.Status.GetShortDetailByID = function (id) {
    switch (id) {
        case ServiceStatePreAlpha:
            return "LocaleText[0]"
        case ServiceStateAlpha:
            return "LocaleText[2]"
        case ServiceStateBeta:
            return "LocaleText[4]"
        case ServiceStatePerpetualBeta:
            return "LocaleText[6]"
        case ServiceStateOpenBeta:
            return "LocaleText[8]"
        case ServiceStateClosedBeta:
            return "LocaleText[10]"
        case ServiceStateReleaseCandidate:
            return "LocaleText[12]"
        case ServiceStateStableRelease:
            return "LocaleText[14]"
        case ServiceStateEndOfLife:
            return "LocaleText[16]"
    }
}

/**
 * return service status long detail text by https://en.wikipedia.org/wiki/Software_release_life_cycle
 * @param {number} id 
 */
Service.Status.GetLongDetailByID = function (id) {
    switch (id) {
        case ServiceStatePreAlpha:
            return "LocaleText[1]"
        case ServiceStateAlpha:
            return "LocaleText[3]"
        case ServiceStateBeta:
            return "LocaleText[5]"
        case ServiceStatePerpetualBeta:
            return "LocaleText[7]"
        case ServiceStateOpenBeta:
            return "LocaleText[9]"
        case ServiceStateClosedBeta:
            return "LocaleText[11]"
        case ServiceStateReleaseCandidate:
            return "LocaleText[13]"
        case ServiceStateStableRelease:
            return "LocaleText[15]"
        case ServiceStateEndOfLife:
            return "LocaleText[17]"
    }
}
