/* For license and copyright information please see LEGAL file in repository */

// https://en.wikipedia.org/wiki/HTML_attribute
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
const StateUnset = 0,
    StateNormal = 1,
    StateError = 2,

    StateOpening = 1,
    StateOpen = 2,
    StateClosing = 3,
    StateClose = 4,

    StateToggling = 6,
    StatePushed = 7,

    // User actions state
    StateHover = 9,
    StateActive = 8,
    StateFocused = 9,
    StateFocusedVisible = 9,
    StateFocusedWithin = 9,

    // Resource state
    StatePlaying = 10,
    StatePause = 11,

    StateSelected = 8,
    StateChecked = 9,
    StateVisited = 10,
    StateDisabled = 10,
    StateHidden = 11,

    StateDragging = 12,
    StateDragged = 13,
    StateMoving = 12,
    StateMoved = 13

    // onblur, 

