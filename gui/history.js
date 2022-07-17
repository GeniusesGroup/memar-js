/* For license and copyright information please see LEGAL file in repository */

Application.history = {
    activeState: null,
    incremental: [],
    back: [],
    forward: [],
}

Application.history.newState = function (pageState) {
    // First finish last state
    // this.activeState.Finish()

    this.activeState = pageState
    // this.incremental.push(pageState)

    // push state into the history stack
    window.history.pushState(pageState, pageState.Title, null)

    // Tell others about app get new state to do whatever they must do on state change!
    window.dispatchEvent(new Event('stateChanged'))
}
