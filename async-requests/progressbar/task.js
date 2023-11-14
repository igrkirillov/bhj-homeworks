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
    xhr.addEventListener("progress", event => {
        setProgress(event.loaded, event.total);
    });
    xhr.upload.onerror = function() {
        console.log(`Error during the upload: ${xhr.status}.`);
        alert(xhr.statusText);
    };
    xhr.onload = function() {
        console.log('Upload completed successfully.');
        setProgressDone();
    };
    const formData = new FormData();
    const file = fileElement.files[0];
    formData.append(fileElement.name, file, file.name);
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
    xhr.send(formData);
}

function setProgress(loaded, total) {
    progressElement.value = +(loaded / total).toFixed(1);
}

function setProgressDone() {
    progressElement.value = 1;
}