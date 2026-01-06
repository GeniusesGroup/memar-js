/* For license and copyright information please see LEGAL file in repository */

import './error.js'

const ErrErrorNotFound = Err.New("13345944438338031009", "urn:giti:error.protocol:error:not-found").SetDetail("LocaleText[0]", "LocaleText[1]", "LocaleText[2]")
const ErrBrowserStringError =  Err.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("String", "Error", err)
const ErrBrowserTypeError =  Err.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("Browser", "Error", err)
const ErrBrowserError =  Err.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("Browser", "Error", err)
const ErrUnknownError =  Err.New(0, "urn:giti:chrome.google:error:temp-error").SetDetail("Unknown", "Error", err)
