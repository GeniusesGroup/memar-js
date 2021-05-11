/* For license and copyright information please see LEGAL file in repository */

import './error.js'

Giti.Society = {
    poolByID: {},
    poolByName: {},
    societies: [
        {
            ID: 1,
            Name: "LocaleText[0]",
            Description: "LocaleText[1]",
            Picture: "",
        },
        {
            ID: 2,
            Name: "LocaleText[2]",
            Description: "LocaleText[3]",
            Picture: "",
        },
    ]
}

Giti.Society.GetByID = function (id) {
    return this.poolByID[id]
}

Giti.Society.GetByName = function (name) {
    return this.poolByName[name]
}

Giti.Society.GetAllAsOptions = function () {
    let options = ""
    for (let s of this.societies) {
        options += `<option value="${s.Name}">${s.ID}</option>`
    }
    return options
}

// function init() {
for (let s of Giti.Society.societies) {
    Giti.Society.poolByID[s.ID] = s
    Giti.Society.poolByName[s.Name] = s
}
// }