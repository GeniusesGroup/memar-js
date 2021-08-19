/* For license and copyright information please see LEGAL file in repository */

import './loader.js'
import './thing.js'
import './user.js'
import './users.js'
import '../time.js'
import '../language/language.js'

// https://en.wikipedia.org/wiki/Operating_System
const OS = {
    name: "",
    firstTimeRun: false,
}

OS.Init = async function () {
    await this.thing.init()
    this.users.init()
    language.SetLangAndDir()
    this.loader.detectName()
    this.loader.SuggestUpgrade()
    await this.loader.loadApp()
    this.loader.PWA()
}

OS.Shutdown = function () {
    this.users.save()
}

OS.OSName = function () { return this.name }
