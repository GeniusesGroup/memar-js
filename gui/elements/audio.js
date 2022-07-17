/* For license and copyright information please see LEGAL file in repository */

HTMLAudioElement.audioCtx = new AudioContext()

/**
 * 
 * All arguments are optional
 * @param {number} duration duration of the tone in milliseconds. Default is 500
 * @param {number} frequency frequency of the tone in hertz. default is 440
 * @param {number} volume volume of the tone. Default is 1, off is 0.
 * @param {string} type type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
 * @param {function} callback callback to use on end of tone
 */
HTMLAudioElement.Beep = function (duration, frequency, volume, type, callback) {
    let oscillator = this.audioCtx.createOscillator()
    let gainNode = this.audioCtx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioCtx.destination)

    if (volume) gainNode.gain.value = volume
    if (frequency) oscillator.frequency.value = frequency
    if (type) oscillator.type = type
    if (callback) oscillator.onended = callback

    oscillator.start(this.audioCtx.currentTime)
    oscillator.stop(this.audioCtx.currentTime + ((duration || 500) / 1000))
}
