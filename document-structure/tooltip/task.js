const elementsHasTooltip = Array.from(document.querySelectorAll(".has-tooltip"));

elementsHasTooltip.forEach(el => {
    el.addEventListener("click", () => onClickOnElementHasTooltip.call(el));
    el.onclick = event => {
        event.preventDefault();
    };
})

function onClickOnElementHasTooltip() {
    const elementHasTooltip = this;
    if (!isElementTooltip(elementHasTooltip.nextElementSibling)) {
        closeAnyTooltipIfIsDisplayed();
        const tooltipElement = createTooltipElement(elementHasTooltip.title, elementHasTooltip.dataset.position,
            elementHasTooltip.getBoundingClientRect());
        elementHasTooltip.insertAdjacentElement("afterend", tooltipElement);
        tooltipElement.classList.add("tooltip_active");
    } else {
        elementHasTooltip.nextElementSibling.remove();
    }
}

function isElementTooltip(element) {
    return element && element.classList.contains("tooltip");
}

function closeAnyTooltipIfIsDisplayed() {
    const tooltips = Array.from(document.querySelectorAll(".tooltip"));
    tooltips.forEach(tt => {
       tt.remove();
    });
}

function createTooltipElement(text, position, rect) {
    const element = document.createElement("div");
    element.textContent = text;
    element.classList.add("tooltip");
    if (position) {
        switch (position) {
            case "top":
                element.style.bottom = rect.top + "px";
                element.style.left = rect.left + "px";
                break;
            case "bottom":
                element.style.top = rect.bottom + "px";
                element.style.left = rect.left + "px";
                break;
            case "left":
                element.style.top = rect.top + "px";
                element.style.right = rect.left + "px";
                break;
            case "right":
                element.style.top = rect.top + "px";
                element.style.left = (rect.left + rect.width) + "px";
                break;
            default:
                element.style.top = rect.bottom + "px";
                element.style.left = rect.left + "px";
        }
    } else {
        element.style.top = rect.bottom + "px";
        element.style.left = rect.left + "px";
    }
    return element;
}