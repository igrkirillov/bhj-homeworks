const fontLinks = Array.from(document.querySelectorAll("div.book__control_font-size > a.font-size"));
const colorLinks = Array.from(document.querySelectorAll("div.book__control_color > a.color"));
const backgroundLinks = Array.from(document.querySelectorAll("div.book__control_background > a.color"));

const contentElement = document.querySelector("div.book__content");
addClickListener(onClickOnFontLink, fontLinks);
addClickListener(onClickOnColorLink, colorLinks);
addClickListener(onClickOnBackgroundLink, backgroundLinks);

function addClickListener(listener, links) {
    for (const link of links) {
        link.addEventListener("click", () => listener.call(link));
        link.onclick = event => {
            event.preventDefault();
        };
    }
}

function onClickOnFontLink() {
    activateFontLink(this);
    const size = this.dataset.size;
    contentElement.classList.remove("book_fs-big", "book_fs-small");
    switch (size) {
        case "small":
            contentElement.classList.add("book_fs-small");
            break;
        case "big":
            contentElement.classList.add("book_fs-big");
            break;
        default:
            // do nothing
    }
}

function activateFontLink(activeFontLink) {
    for (const fontLink of activeFontLink.parentElement.children) {
        if (fontLink === activeFontLink) {
            fontLink.classList.add("font-size_active");
        } else {
            fontLink.classList.remove("font-size_active");
        }
    }
}

function onClickOnColorLink() {
    activateColorLink(this);
    const color = this.dataset.textColor;
    contentElement.classList.remove("book_color-gray", "book_color-whitesmoke", "book_color-black");
    switch (color) {
        case "gray":
            contentElement.classList.add("book_color-gray");
            break;
        case "whitesmoke":
            contentElement.classList.add("book_color-whitesmoke");
            break;
        case "black":
            contentElement.classList.add("book_color-black");
            break;
        default:
        // do nothing
    }
}

function onClickOnBackgroundLink() {
    activateColorLink(this);
    const bgColor = this.dataset.bgColor;
    contentElement.classList.remove("bg_color_black", "bg_color_gray", "bg_color_white");
    switch (bgColor) {
        case "black":
            contentElement.classList.add("bg_color_black");
            break;
        case "gray":
            contentElement.classList.add("bg_color_gray");
            break;
        case "white":
            contentElement.classList.add("bg_color_white");
            break;
        default:
        // do nothing
    }
}

function activateColorLink(activeLink) {
    for (const colorLink of activeLink.parentElement.children) {
        if (colorLink === activeLink) {
            colorLink.classList.add("color_active");
        } else {
            colorLink.classList.remove("color_active");
        }
    }
}