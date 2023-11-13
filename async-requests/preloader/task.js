const loaderElement = document.getElementById("loader");
const itemsElement = document.getElementById("items");

loadRatesFromStock();

function loadRatesFromStock() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", event => {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                parseRatesAndAddToPage(xhr.responseText);
                deactivateLoader();
            } else {
                deactivateLoader();
                alert(xhr.statusText);
            }
        }
    });
    xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/slow-get-courses");
    activateLoader();
    clearRateItemsOnPage();
    xhr.send();
}

function parseRatesAndAddToPage(responseJsonText) {
    clearRateItemsOnPage();
    const valute = JSON.parse(responseJsonText)["response"]["Valute"];
    for (const rateKey of Object.keys(valute)) {
        const rateCode = valute[rateKey]["CharCode"];
        const rateValue = valute[rateKey]["Value"];
        const rateElement = createRateElement(rateCode, rateValue);
        addRateElementToItemsList(rateElement);
    }
}

function clearRateItemsOnPage() {
    Array.from(itemsElement.children).forEach(el => el.remove());
}

function createRateElement(rateCode, rateValue) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML =
        `<div class="item__code">
           ${rateCode}
        </div>
        <div class="item__value">
           ${rateValue}
        </div>
        <div class="item__currency">
           руб.
        </div>`;
    return itemElement;
}

function addRateElementToItemsList(itemElement) {
    itemsElement.appendChild(itemElement);
}

function activateLoader() {
    if (!loaderElement.classList.contains("loader_active")) {
        loaderElement.classList.add("loader_active");
    }
}

function deactivateLoader() {
    if (loaderElement.classList.contains("loader_active")) {
        loaderElement.classList.remove("loader_active");
    }
}
