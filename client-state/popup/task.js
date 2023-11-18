const modalElement = document.getElementById("subscribe-modal");
const closeModalElement = document.querySelectorAll(".modal__close")[0];

closeModalElement.addEventListener("click", onClickOnCloseModalElement);

if (!isSubsribeModalDisplayedAlready()) {
    modalElement.classList.add("modal_active");
}

function onClickOnCloseModalElement() {
    modalElement.classList.remove("modal_active");
    setSubsribeModalDisplayedToCookie();
}

function isSubsribeModalDisplayedAlready() {
    const value = document.cookie.split(";").find(el => el.startsWith("subscribeModalDisplayed="));
    return value && value.trim().substring("subscribeModalDisplayed=".length) === "true";
}

function setSubsribeModalDisplayedToCookie() {
    document.cookie = "subscribeModalDisplayed=true";
}