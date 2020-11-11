/* For license and copyright information please see LEGAL file in repository */

import './base64.js'
import './cookie.js'
import './errors.js'
import './Achaemenid-sdk/set-connection-thing-id.js'

const thingGuestID = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

const thing = {
    ID: thingGuestID,
    rtcConnection: {},
}

thing.init = async function () {
    let thingID = cookie.GetByName(HTTPCookieNameThingID)
    if (!thingID) {
        if (RTCPeerConnection) {
            this.rtcConnection = new RTCPeerConnection()

            thing.rtcConnection.onicecandidate = async function (event) {
                if (thing.rtcConnection.iceGatheringState === 'complete') {
                    thing.rtcConnection = null
                }

                if (!event.candidate) return

                // For Chrome
                if (event.candidate.foundation) {
                    await thing.SaveID(event.candidate.foundation)
                    return
                }

                if (event.candidate.candidate) {
                    // For Safari
                    const matches = (/^candidate:(\d+)\s/).exec(event.candidate.candidate)
                    if (!matches || matches[1].length < 2) return

                    await thing.SaveID(matches[1])
                    return
                }
            }

            // TODO::: For Safari but causes an error on firefox.
            try {
                const stream = document.createElement('canvas').captureStream()
                stream.getTracks().forEach((track) => this.rtcConnection.addTrack(track))
            } catch (err) {
                // console.log(err)
            }

            const offer = await this.rtcConnection.createOffer({
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1
            })
            await this.rtcConnection.setLocalDescription(offer)
        }
    } else {
        this.ID = thingID
    }
}

thing.SaveID = async function (id) {
    if (this.ID !== thingGuestID) return

    this.ID = await base64.stdWithoutPadding.HashTo32Byte(id)

    cookie.SetCookie({
        Name: HTTPCookieNameThingID,
        Value: thing.ID,
        MaxAge: "630720000",
        // Secure: true,
    })

    // SetConnectionThingIDReq is the request structure of SetConnectionThingID()
    const SetConnectionThingIDReq = {
        "ThingID": this.ID,
    }
    try {
        await SetConnectionThingID(SetConnectionThingIDReq)
    } catch (err) {
        errors.HandleError(err)
    }
}
