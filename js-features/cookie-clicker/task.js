"use strict";
const cookieElement = document.getElementById("cookie");
const origWidth = cookieElement.width;
let clickCount = 0;
let lastClickDateTime = null;

cookieElement.onclick = clickHandler;

function clickHandler() {
    if (cookieElement.width !== origWidth) {
        cookieElement.width = origWidth;
    } else {
        cookieElement.width = origWidth - 5;
    }
    ++clickCount;
    document.getElementById("clicker__counter").textContent = "" + clickCount;
    document.getElementById("clicker__velocity").textContent = "" + calcVelocity(new Date());
}

function calcVelocity(clickDateTime) {
    let velocity;
    if (lastClickDateTime === null) {
        velocity = 0;
    } else {
        const secs = (clickDateTime.getTime() - lastClickDateTime.getTime()) / 1000;
        velocity =  +(1 / secs).toFixed(3);
    }
    lastClickDateTime = clickDateTime;
    return velocity;
}