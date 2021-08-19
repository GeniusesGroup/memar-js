/* For license and copyright information please see LEGAL file in repository */

const page = {
    URN: {
        URN: "",
        ID: "",
        Domain: "",
        Scope: "page",
        Name: "", // same as pages key
    },
    Icon: "",
    Info: { Name: "", ShortName: "", Tagline: "", Slogan: "", Description: "", Tags: [] },
    Related: [],
    Robots: "", // "all", "noindex", "nofollow", "none", "noarchive", "nosnippet", "notranslate", "noimageindex", "unavailable_after: [RFC-850 date/time]"
    HTML: () => ``,
    CSS: '',
    Templates: {},
    Options: {},
    acceptedConditions: [],
    activeState: null,
}

page.ActiveState = function () { return this.activeState }
