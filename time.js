/* For license and copyright information please see LEGAL file in repository */

const time = {
    unix: {},
}

time.unix.String = function (unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);

    let dateString = date.toLocaleDateString(window.document.documentElement.lang)
    let timeString = date.toLocaleTimeString(window.document.documentElement.lang)

    return dateString + " " + timeString
}

time.Sleep = async function (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

time.SleepBlocking = function (milliseconds) {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } while (currentDate - date < milliseconds)
}