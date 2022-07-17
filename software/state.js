/* For license and copyright information please see LEGAL file in repository */

/**
 * Software_PreAlpha refers to all activities performed during the software project before formal testing.
 */
const Software_PreAlpha = 0
/**
 * Software_Alpha is the first phase to begin software testing
 */
const Software_Alpha = 1
/**
 * Software_Beta generally begins when the software is feature complete but likely to contain a number of known or unknown bugs.
 */
const Software_Beta = 2
/**
 * Software_PerpetualBeta where new features are continually added to the software without establishing a final "stable" release.
 * This technique may allow a developer to delay offering full support and responsibility for remaining issues.
 */
const Software_PerpetualBeta = 3
/**
 * Software_OpenBeta is for a larger group, or anyone interested.
 */
const Software_OpenBeta = 4
/**
 * Software_ClosedBeta is released to a restricted group of individuals for a user test by invitation.
 */
const Software_ClosedBeta = 5
/**
 * Software_ReleaseCandidate also known as "going silver", is a beta version with potential to be a stable product,
 * which is ready to release unless significant bugs emerge
 */
const Software_ReleaseCandidate = 6
/**
 * Software_StableRelease Also called production release,
 * the stable release is the last release candidate (RC) which has passed all verifications / tests.
 */
const Software_StableRelease = 7
/**
 * Software_EndOfLife indicate no longer supported and continue its existence until to ExpiryDate!
 */
const Software_EndOfLife = 8

/**
 * return service status short detail text by https://en.wikipedia.org/wiki/Software_release_life_cycle
 * @param {number} id 
 */
Service.Status.GetShortDetailByID = function (id) {
    switch (id) {
        case Software_PreAlpha:
            return "LocaleText[0]"
        case Software_Alpha:
            return "LocaleText[2]"
        case Software_Beta:
            return "LocaleText[4]"
        case Software_PerpetualBeta:
            return "LocaleText[6]"
        case Software_OpenBeta:
            return "LocaleText[8]"
        case Software_ClosedBeta:
            return "LocaleText[10]"
        case Software_ReleaseCandidate:
            return "LocaleText[12]"
        case Software_StableRelease:
            return "LocaleText[14]"
        case Software_EndOfLife:
            return "LocaleText[16]"
    }
}

/**
 * return service status long detail text by https://en.wikipedia.org/wiki/Software_release_life_cycle
 * @param {number} id 
 */
Service.Status.GetLongDetailByID = function (id) {
    switch (id) {
        case Software_PreAlpha:
            return "LocaleText[1]"
        case Software_Alpha:
            return "LocaleText[3]"
        case Software_Beta:
            return "LocaleText[5]"
        case Software_PerpetualBeta:
            return "LocaleText[7]"
        case Software_OpenBeta:
            return "LocaleText[9]"
        case Software_ClosedBeta:
            return "LocaleText[11]"
        case Software_ReleaseCandidate:
            return "LocaleText[13]"
        case Software_StableRelease:
            return "LocaleText[15]"
        case Software_EndOfLife:
            return "LocaleText[17]"
    }
}
