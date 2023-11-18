class User {
    constructor(id, login) {
        this.id = id;
        this.login = login;
    }
}
const signinElement = document.getElementById("signin");
const welcomeElement = document.getElementById("welcome");
const signinForm = document.forms["signin__form"];
const signinButtonElement = document.getElementById("signin__btn");
const userElement = document.getElementById("user_id");
const signoutButtonElement = document.getElementById("signout");
const signinFormInputElement = Array.from(document.querySelectorAll("input"))
    .find(el => el.closest("#signin__form") && el.name === "login");

signoutButtonElement.addEventListener("click", onClickOnSignoutButton);

const user = getUserFromLocalStorage();
if (user) {
    loadUserOnPage(user);
} else {
    signinButtonElement.addEventListener("click", onClickOnSigninButton)
}

function onClickOnSignoutButton() {
    clearUserInLocalStorage();
    signinForm.reset();
    displaySignForm();
    signinFormInputElement.focus();
}

function loadUserOnPage(user) {
    signinElement.classList.remove("signin_active");
    welcomeElement.classList.add("welcome_active");
    userElement.textContent = "" + user.id;
}

function displaySignForm() {
    signinElement.classList.add("signin_active");
    welcomeElement.classList.remove("welcome_active");
}

function onClickOnSigninButton(event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", signinForm.action);
    xhr.addEventListener("readystatechange", () => {
       if (xhr.readyState === xhr.DONE) {
           if (xhr.status >= 200 || xhr.status < 300) {
               processSigninResponseText(xhr.responseText);
           } else {
               alert(xhr.statusText);
           }
       }
    });
    xhr.send(new FormData(signinForm));
}

function processSigninResponseText(responseText) {
    try {
        const response = JSON.parse(responseText);
        if (response.success === true) {
            const user = new User(response["user_id"]);
            loadUserOnPage(user);
            saveUserToLocalStorage(user);
        } else {
            alert("Неверный логин/пароль!");
        }
    } catch (e) {
        alert("Ошибка чтения ответа от сервера!");
    }
}

function getUserFromLocalStorage() {
    let user = null;
    const userSerializedText = localStorage.getItem("user");
    if (userSerializedText) {
        try {
            user = JSON.parse(userSerializedText);
        } catch {
            // do nothing
        }
    }
    return user;
}

function saveUserToLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function clearUserInLocalStorage() {
    localStorage.removeItem("user");
}
