const dropdowns = Array.from(document.querySelectorAll("div.dropdown"));
for (const dropdown of dropdowns) {
    dropdown.addEventListener("click", () => onClickDropdown.call(dropdown));

    const dropdownItems = Array.from(document.querySelectorAll("li.dropdown__item"))
        .filter(el => el.closest("div.dropdown") === dropdown);
    for (const dropdownItem of Array.from(dropdownItems)) {
        dropdownItem.addEventListener("click", () => onClickDropdownItem.call(dropdownItem));
    }

    const dropdownLinks = Array.from(document.querySelectorAll("li.dropdown__item a.dropdown__link"))
        .filter(el => el.closest("div.dropdown") === dropdown);
    for (const dropdownLink of Array.from(dropdownLinks)) {
        dropdownLink.onclick = event => {
            event.preventDefault();
        };
    }
}

function onClickDropdown() {
    const dropdown = this;
    const ul = Array.from(document.querySelectorAll("ul.dropdown__list"))
        .filter(el => el.closest("div.dropdown") === dropdown)[0];
    if (ul.classList.contains("dropdown__list_active")) {
        ul.classList.remove("dropdown__list_active");
    } else {
        ul.classList.add("dropdown__list_active");
    }
}

function onClickDropdownItem() {
    const dropdown = this.closest("div.dropdown");
    getDropdownValueElement(dropdown).textContent = getDropdownItemText(this);
}

function getDropdownValueElement(dropdown) {
    return Array.from(document.querySelectorAll("div.dropdown__value"))
        .filter(el => el.closest("div.dropdown") === dropdown)[0];
}

function getDropdownItemText(dropdownItem) {
    return Array.from(document.querySelectorAll("a.dropdown__link"))
        .filter(el => el.closest("li.dropdown__item") === dropdownItem)[0].textContent;
}