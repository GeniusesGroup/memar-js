/* For license and copyright information please see LEGAL file in repository */

Sleep = async function (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

SleepBlocking = function (milliseconds) {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } while (currentDate - date < milliseconds)
}
