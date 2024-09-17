
'use strict';

let cheatCode = false;
let won = false;

/**
 * setup the event listeners
 */
function setup() {
    // TODO: add an event listener for a mouseover for the div
    document.getElementById("clickMeDiv").addEventListener("mouseover", moveDivWithButton);

    // TODO: add an event listener for a click for the button
    document.getElementById("clickMeBtn").addEventListener("click", handleButtonClick);
    document.addEventListener("keydown", handleKeyDownEvent);
    document.addEventListener("keyup", handleKeyUpEvent);
}

/**
 * Move the div if the click me button appears and the cheat code is off
 * @param e The mouse event
 */
function moveDivWithButton(e) {
    let newLeft = Math.floor(Math.random() * 200) + "px";
    let newTop  = Math.floor(Math.random() * 200) + "px";

    // TODO: Need to figure out if the button should move. If so, move it!
    if(cheatCode === false && won === false) {
        document.getElementById("clickMeDiv").style.left = newLeft;
        document.getElementById("clickMeDiv").style.top = newTop;
    }
}

/**
 * Turn the cheat code on if the shift key is down
 * @param e The keyboard event
 */
function handleKeyDownEvent(e) {
    if(e.key === "Shift") {
        cheatCode = true;
    }
}

/**
 * Turn the cheat code off is the shift key is released
 * @param e The keyboard event
 */
function handleKeyUpEvent(e) {
    if(e.key === "Shift") {
        cheatCode = false;
    }
}

/**
 * Change the button text when the button is clicked
 */
function handleButtonClick() {
    if(won === false) {
        document.getElementById("clickMeBtn").innerHTML = "You Won! Play Again.";
        won = true;
    }
    else if(won === true) {
        document.getElementById("clickMeBtn").innerHTML = "Click Me.";
        won = false;
    }
}
