"use strict";
const timerElement = document.getElementById("timer");
let counterValue = +timerElement.textContent;
let countDownIntervalId = null;
function countDownExec() {
    --counterValue;
    timerElement.textContent = formatTimeToHHmmSS(counterValue);
    if (counterValue === 0 && countDownIntervalId !== null) {
        clearInterval(countDownIntervalId);
        // alert("Вы победили в конкурсе!");
        downloadFile("./demo.gif")
    }
}

function downloadFile(fileUrl) {
    const downloadLink = document.getElementById("file_download_link");
    downloadLink.href = fileUrl;
    downloadLink.click();
}

countDownIntervalId = setInterval(countDownExec, 1000);

function formatTimeToHHmmSS(origSeconds) {
    const hours = +(origSeconds / 3600).toFixed();
    const minutes = +((origSeconds - hours * 3600) / 60).toFixed();
    const seconds = origSeconds - hours * 3600 - minutes * 60;
    return formatTwoDigit(hours) + ":" + formatTwoDigit(minutes) + ":" + formatTwoDigit(seconds);
}

function formatTwoDigit(digit) {
    return digit < 10 ? "0" + digit : "" + digit;
}