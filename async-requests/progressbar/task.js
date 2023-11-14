const formElement = document.forms.form;
const buttonElement = document.getElementById("button");
const fileElement = document.getElementById("file");
const progressElement = document.getElementById("progress");

formElement.addEventListener("submit", event => {
    event.preventDefault();
    sendFileToSite();
})

function sendFileToSite() {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", event => {
        setProgress(event.loaded, event.total);
    });
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status >= 200 || xhr.status < 300) {
                alert("Done");
                setProgressZero();
            } else {
                alert("Error: " + xhr.statusText);
            }
        }
    });
    const formData = new FormData(formElement);
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload", true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(formData);
}

function setProgress(loaded, total) {
    progressElement.value = +(loaded / total).toFixed(1);
}

function setProgressZero() {
    progressElement.value = 0;
}