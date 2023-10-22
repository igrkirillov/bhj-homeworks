"use strict";

const maxMistakes = 5;
const minStrikes = 10;
let mistakes = 0;
let strikes = 0;

for (let i = 1; i <= 9; ++i) {
    document.getElementById(getHoleId(i)).onclick = getSpecHoleClickHandler(i);
}

function getSpecHoleClickHandler(index) {
    const holeElement = document.getElementById(getHoleId(index));
    function holeClickHandler() {
        if (isClickStrike(holeElement)) {
            processStrike();
        } else {
            processMistake();
        }
    }
    return holeClickHandler;
}

function getHoleId(index) {
    return "hole" + index;
}

function isClickStrike(clickedHoleElement) {
    return clickedHoleElement.className.includes( 'hole_has-mole' );
}

function processStrike() {
    ++strikes;
    refreshView();
    if (strikes >= minStrikes) {
        alert("Победа!")
        resetGame();
    }
}

function processMistake() {
    ++mistakes;
    refreshView();
    if (mistakes >= maxMistakes) {
        alert("Game over!")
        resetGame();
    }
}

function resetGame() {
    strikes = 0;
    mistakes = 0;
    refreshView();
}

function refreshView() {
    document.getElementById("dead").textContent = "" + strikes;
    document.getElementById("lost").textContent = "" + mistakes;
}