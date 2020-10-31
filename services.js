/* For license and copyright information please see LEGAL file in repository */

/**
 * 
 * Service Status: https://en.wikipedia.org/wiki/Software_release_life_cycle
 */
const services = {
    poolByID: {},
    status: {},
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
 * return service status in text by https://en.wikipedia.org/wiki/Software_release_life_cycle
 * @param {number} id 
 */
services.status.GetNameByID = function (id) {
    switch (id) {
        case ServiceStatePreAlpha:
            // PreAlpha refers to all activities performed during the software project before formal testing.
            return "LocaleText[0]"
        case ServiceStateAlpha:
            // Alpha is the first phase to begin software testing
            return "LocaleText[1]"
        case ServiceStateBeta:
            // Beta generally begins when the software is feature complete but likely to contain a number of known or unknown bugs.
            return "LocaleText[2]"
        case ServiceStatePerpetualBeta:
            // PerpetualBeta where new features are continually added to the software without establishing a final "stable" release.
            // This technique may allow a developer to delay offering full support and responsibility for remaining issues.
            return "LocaleText[3]"
        case ServiceStateOpenBeta:
            // OpenBeta is for a larger group, or anyone interested.
            return "LocaleText[4]"
        case ServiceStateClosedBeta:
            // ClosedBeta is released to a restricted group of individuals for a user test by invitation.
            return "LocaleText[5]"
        case ServiceStateReleaseCandidate:
            // ReleaseCandidate also known as "going silver", is a beta version with potential to be a stable product,
            // which is ready to release unless significant bugs emerge
            return "LocaleText[6]"
        case ServiceStateStableRelease:
            // StableRelease Also called production release,
            // the stable release is the last release candidate (RC) which has passed all verifications / tests.
            return "LocaleText[7]"
        case ServiceStateEndOfLife:
            // EndOfLife indicate no longer supported and continue its existence until to ExpiryDate!
            return "LocaleText[8]"
    }
}
