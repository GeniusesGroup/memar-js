/* For license and copyright information please see LEGAL file in repository */

import './base64.js'
import './cookie.js'
import './sdk/Achaemenid/set-connection-thing-id.js'

const thingGuestID = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

OS.thing = {
    id: thingGuestID,
    rtc: {
        connection: null,
        id: "",
    },
}

OS.ThingID = function () { return this.thing.id }

OS.thing.init = async function () {
    const thingID = localStorage.getItem('ThingID')
    if (thingID) {
        this.id = thingID
    } else {
        await this.rtc.generateID()
        if (this.rtc.id) this.id = await base64.stdWithoutPadding.HashTo32Byte(this.rtc.id)
        this.save()
    }
    await this.checkCookie()
}

OS.thing.checkCookie = async function () {
    if (this.id === thingGuestID) return

    let thingID = cookie.GetByName(HTTPCookieNameThingID)
    if (!thingID || thingID !== this.id) {
        cookie.SetCookie({
            Name: HTTPCookieNameThingID,
            Value: this.id,
            MaxAge: "630720000",
            // Secure: true,
        })

        // SetConnectionThingIDReq is the request structure of SetConnectionThingID()
        const SetConnectionThingIDReq = {
            "ThingID": this.id,
        }
        try {
            await SetConnectionThingID(SetConnectionThingIDReq)
        } catch (err) {
            err.NotifyToUser()
        }
    }
}

OS.thing.save = function () {
    localStorage.setItem('ThingID', this.id)
}

OS.thing.rtc.onIceCandidate = async function (event) {
    if (OS.thing.rtc.connection.iceGatheringState === 'complete') {
        if (!OS.thing.rtc.id) {
            OS.thing.rtc.rejecter('This browser is not supported, so cannot provide a unique, static ID for this machine.')
        }
        OS.thing.rtc.connection.close()
        OS.thing.rtc.connection = null
        return
    }

    if (!event.candidate) return

    // For Chrome
    if (event.candidate.foundation) {
        OS.thing.rtc.id = event.candidate.foundation
        OS.thing.rtc.resolver(event.candidate.foundation)
        return
    }

    if (event.candidate.candidate) {
        // For Safari
        const matches = (/^candidate:(\d+)\s/).exec(event.candidate.candidate)
        if (!matches || matches[1].length < 2) return

        OS.thing.rtc.id = matches[1]
        OS.thing.rtc.resolver(matches[1])
        return
    }
}

OS.thing.rtc.startRTCConnection = async function () {
    this.connection = new RTCPeerConnection()
    this.connection.onicecandidate = this.onIceCandidate

    // TODO::: For Safari but causes an error on firefox.
    try {
        const stream = document.createElement('canvas').captureStream()
        stream.getTracks().forEach((track) => this.connection.addTrack(track))
    } catch (err) {
        OS.thing.rtc.rejecter(err)
    }

    const offer = await this.connection.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    })
    await this.connection.setLocalDescription(offer)
}

OS.thing.rtc.generateID = async function () {
    if (!RTCPeerConnection) {
        throw new Error(`This browser doesn't support WebRTC, so cannot provide a unique, static ID for this machine.`)
    }
    return new Promise((resolve, reject) => {
        this.rtc.resolver = resolve
        this.rtc.rejecter = reject
        this.rtc.startRTCConnection()
    })
}
