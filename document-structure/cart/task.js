class Product {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

const productsElements = Array.from(document.querySelectorAll(".product"));
const cartProductsElement = document.querySelector(".cart__products");
const productsInCart = loadProductsInCartFromStorage();

productsInCart.forEach(product => {
    const productElement = getProductElementByProductId(product.id);
    const cartItemElement = createCartItemElement(product.id, "", getProductImageUrl(productElement), product.quantity);
    appendCartItemElementToCartWithoutFlyEffect(cartItemElement);
})

for (const productElement of productsElements) {
    const quantityDecControl = Array.from(document.querySelectorAll(".product__quantity-control_dec"))
        .filter(el => el.closest(".product") === productElement)[0];
    quantityDecControl.addEventListener("click", () => onClickOnProductDecControl.call(productElement));
    const quantityIncControl = Array.from(document.querySelectorAll(".product__quantity-control_inc"))
        .filter(el => el.closest(".product") === productElement)[0];
    quantityIncControl.addEventListener("click", () => onClickOnProductIncControl.call(productElement));
    const productAddControl = Array.from(document.querySelectorAll(".product__add"))
        .filter(el => el.closest(".product") === productElement)[0];
    productAddControl.addEventListener("click", () => onClickOnAddProductToCart.call(productElement));
}

function onClickOnProductDecControl() {
    const productControl = this;
    const currentQuantity = getCurrentProductQuantityValue(productControl);
    const newValue = Math.max(1, currentQuantity - 1);
    setCurrentProductQuantityValue(productControl, newValue);
}

function onClickOnProductIncControl() {
    const productControl = this;
    const currentQuantity = getCurrentProductQuantityValue(productControl);
    const newValue = Math.min(999, currentQuantity + 1);
    setCurrentProductQuantityValue(productControl, newValue);
}

function getCurrentProductQuantityValue(productElement) {
    const quantityElement = Array.from(document.querySelectorAll(".product__quantity-value"))
        .filter(el => el.closest(".product") === productElement)[0];
    return +quantityElement.textContent
}

function setCurrentProductQuantityValue(productElement, newValue) {
    const quantityElement = Array.from(document.querySelectorAll(".product__quantity-value"))
        .filter(el => el.closest(".product") === productElement)[0];
    quantityElement.textContent = "" + newValue;
}

function getProductImageUrl(productElement) {
    const imageElement = Array.from(document.querySelectorAll(".product__image"))
        .filter(el => el.closest(".product") === productElement)[0];
    return imageElement.src;
}

function getProductIdOfProductElement(productElement) {
    return productElement.dataset.id;
}

function onClickOnAddProductToCart() {
    const productElement = this;
    const productId = getProductIdOfProductElement(productElement);
    const quantityValue = getCurrentProductQuantityValue(productElement);
    if (!isProductExistInCart(productElement)) {
        addOrUpdateProductIfExists(productId, quantityValue);
        const cartItemElement = createCartItemElement(productId, "", getProductImageUrl(productElement), quantityValue);
        appendCartItemElementToCartWithFlyEffect(productId, cartItemElement);
    } else {
        const cartItemElement = getCartItemElementByProductId(productId);
        const newQuantityValue = getCurrentCartItemQuantityValue(cartItemElement) + quantityValue;
        addOrUpdateProductIfExists(productId, newQuantityValue);
        setQuantityValueOfCartItem(cartItemElement, newQuantityValue)
    }
}

function addOrUpdateProductIfExists(productId, newQuantityValue) {
    const index = productsInCart.findIndex(el => el.id === productId);
    if (index >= 0) {
        productsInCart[index].quantity = newQuantityValue;
    } else {
        productsInCart.push(new Product(productId, newQuantityValue))
    }
    saveProductsInCartToStorage(productsInCart);
}

function removeProductByProductId(productId) {
    const index = productsInCart.findIndex(el => el.id === productId);
    if (index >= 0) {
        productsInCart.splice(index, 1);
        saveProductsInCartToStorage(productsInCart);
    }
}

function appendCartItemElementToCartWithoutFlyEffect(cartItemElement) {
    cartProductsElement.appendChild(cartItemElement);
}

function appendCartItemElementToCartWithFlyEffect(productId, cartItemElement) {
    const productElement = getProductElementByProductId(productId);
    const speed = 10; //px
    const startPoint = {
        x: productElement.getBoundingClientRect().left,
        y: productElement.getBoundingClientRect().bottom
    }
    const endPoint = {
        x: window.innerWidth / 2,
        y: cartProductsElement.getBoundingClientRect().top
    }
    const context = {
        cartItemElement,
        startPoint,
        endPoint,
        speed,
        _currentPoint: {
            x: startPoint.x,
            y: startPoint.y,
        },
        imageElement: null,
        intervalId: null,
        get nextPoint() {
            const k = Math.abs(endPoint.x - startPoint.x) / Math.abs(endPoint.y - startPoint.y);
            const dy = Math.sqrt(speed * speed / (1 + k * k) );
            const dx = Math.sqrt(speed * speed - dy * dy);
            return {
                x: this._currentPoint.x + dx,
                y: this._currentPoint.y - dy
            };
        },
        set currentPoint(point) {
            this._currentPoint = point;
        },
        get currentPoint() {
            return this._currentPoint;
        },
        get flyEnd() {
            return this._currentPoint.x >= endPoint.x || this._currentPoint.y <= endPoint.y;
        }
    }
    startImageFlying(getProductImageUrl(productElement), context);
}

function startImageFlying(imageUrl, context) {
    const imageElement = document.createElement("img");
    imageElement.classList.add("product__image");
    imageElement.src = imageUrl;
    imageElement.style.position = "fixed";
    imageElement.style.top = Math.trunc(context.y) + "px";
    imageElement.style.left = Math.trunc(context.x) + "px";
    document.getElementsByTagName("body")[0].appendChild(imageElement);
    context.imageElement = imageElement;
    context.intervalId = setInterval(() => flyImage.call(context), 5);
}

function flyImage() {
    const context = this;
    if (context.flyEnd) {
        console.log("flyEnd");
        clearInterval(context.intervalId);
        context.imageElement.remove();
        cartProductsElement.appendChild(context.cartItemElement);
    } else {
        const point = context.nextPoint;
        console.log("fly to " + point);
        context.imageElement.style.top = Math.trunc(point.y) + "px";
        context.imageElement.style.left = Math.trunc(point.x) + "px";
        context.currentPoint = point;
    }
}

function getProductElementByProductId(productId) {
    return productsElements.filter(el => el.dataset.id === productId)[0];
}

function setQuantityValueOfCartItem(cartItemElement, newQuantityValue) {
    const quantityElement = Array.from(document.querySelectorAll(".product__quantity-value"))
        .filter(el => el.closest(".cart__product") === cartItemElement)[0];
    quantityElement.textContent = "" + newQuantityValue;
}

function isProductExistInCart(productElement) {
    return Array.from(document.querySelectorAll(".cart__product"))
        .findIndex(el => getProductIdOfProductElement(productElement) === el.dataset.id) >= 0;
}

function createCartItemElement(productId, title, imageUrl, quantity) {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart__product");
    cartItemElement.dataset.id = productId;
    const imageElement = document.createElement("img");
    imageElement.classList.add("cart__product-image");
    imageElement.src = imageUrl;
    const quantityControlElement = createCartQuantityControl(cartItemElement, quantity);
    cartItemElement.appendChild(imageElement);
    cartItemElement.appendChild(quantityControlElement);
    return cartItemElement;
}

function getProductIdOfCartItemElement(cartItemElement) {
    return cartItemElement.dataset.id;
}

function createCartQuantityControl(cartItemElement, quantity) {
    const quantityControlElement = document.createElement("div");
    quantityControlElement.classList.add("product__quantity-controls");
    const quantityDecElement = document.createElement("div");
    quantityDecElement.classList.add("product__quantity-control", "product__quantity-control_dec");
    quantityDecElement.textContent = "-";
    const quantityValueElement = document.createElement("div");
    quantityValueElement.classList.add("product__quantity-value");
    quantityValueElement.textContent = "" + quantity;
    const quantityIncElement = document.createElement("div");
    quantityIncElement.classList.add("product__quantity-control", "product__quantity-control_inc");
    quantityIncElement.textContent = "+";
    quantityControlElement.appendChild(quantityDecElement);
    quantityControlElement.appendChild(quantityValueElement);
    quantityControlElement.appendChild(quantityIncElement);
    quantityIncElement.addEventListener("click", () => onClickOnCartItemIncControl.call(cartItemElement));
    quantityDecElement.addEventListener("click", () => onClickOnCartItemDecControl.call(cartItemElement));
    return quantityControlElement;
}


function getCartItemElementByProductId(productId) {
    return Array.from(document.querySelectorAll(".cart__product")).filter(el => el.dataset.id === productId)[0];
}

function onClickOnCartItemDecControl() {
    const cartItemElement = this;
    const currentQuantity = getCurrentCartItemQuantityValue(cartItemElement);
    const newValue = currentQuantity - 1;
    const productId = getProductIdOfCartItemElement(cartItemElement);
    if (newValue > 0) {
        addOrUpdateProductIfExists(productId, newValue);
        setCurrentCartItemQuantityValue(cartItemElement, newValue);
    } else {
        removeProductByProductId(productId)
        cartItemElement.remove();
    }
}

function onClickOnCartItemIncControl() {
    const cartItemElement = this;
    const currentQuantity = getCurrentCartItemQuantityValue(cartItemElement);
    const newValue = Math.min(999, currentQuantity + 1);
    addOrUpdateProductIfExists(getProductIdOfCartItemElement(cartItemElement), newValue);
    setCurrentCartItemQuantityValue(cartItemElement, newValue);
}

function getCurrentCartItemQuantityValue(cartItemElement) {
    const quantityElement = Array.from(document.querySelectorAll(".product__quantity-value"))
        .filter(el => el.closest(".cart__product") === cartItemElement)[0];
    return +quantityElement.textContent
}

function setCurrentCartItemQuantityValue(cartItemElement, newValue) {
    const quantityElement = Array.from(document.querySelectorAll(".product__quantity-value"))
        .filter(el => el.closest(".cart__product") === cartItemElement)[0];
    quantityElement.textContent = "" + newValue;
}

function loadProductsInCartFromStorage() {
    return JSON.parse(window.localStorage.getItem("productsInCart")) || [];
}

function saveProductsInCartToStorage(productsInCart) {
    window.localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
}