const editorElement = document.getElementById("editor");

editorElement.value = getTextFromLocalStorage();
editorElement.addEventListener("input", debounceFunction(onTextChangeOnEditor, 500));
editorElement.focus();

function onTextChangeOnEditor() {
    saveTextToLocalStorage(editorElement.value);
}

function saveTextToLocalStorage(text) {
    localStorage.setItem("text", text);
}

function getTextFromLocalStorage() {
    const text = localStorage.getItem("text");
    return text || "";
}

function debounceFunction(func, wait) {
    let timeoutId;
    return function (...args) {
        const context = this;
        const later = function () {
            timeoutId = null;
            func.call(context, args);
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
    }
}
