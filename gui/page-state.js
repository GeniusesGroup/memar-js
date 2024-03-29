/* For license and copyright information please see LEGAL file in repository */

const pageState = {
    Page: null,
    Title: "",
    Description: "",
    Conditions: { // As engine standard, URL parameters use as page Conditions to show information
        id: "", // e.g. RecordID to display information on page
    },
    Fragment: "", // As standard, URL hash use as page State to show information from that state
    ActiveDate: 0,
    EndDate: 0,
}

pageState.Finish = function() {}

page.ActivatePage(state) = function () { } // will activate the page to bring it front for user with requested state.
page.DeactivatePage() = function () { } // will deactivate the page to bring it to back to allow other page being active.
