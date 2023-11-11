const rotators = Array.from(document.querySelectorAll("span.rotator"));

for (const rotator of rotators) {
    const cases = Array.from(document.querySelectorAll("span.rotator__case"))
        .filter(el => el.closest("span.rotator") === rotator);
    startRotator(rotator, cases);
}

function startRotator(rotator, cases) {
    const context = {
        rotator,
        cases,
        nextIndex: 1,
    };
    const firstCase = cases[0];
    setTimeout(() => rotate.call(context), +firstCase.dataset.speed);
}

function rotate() {
    const prevIndex = this.nextIndex === 0 ? this.cases.length - 1 : this.nextIndex - 1;
    const currentIndex = this.nextIndex;
    this.nextIndex = currentIndex === this.cases.length - 1 ? 0 : currentIndex + 1;
    this.cases[prevIndex].classList.remove("rotator__case_active");
    this.cases[currentIndex].classList.add("rotator__case_active");
    this.cases[currentIndex].style.color = this.cases[currentIndex].dataset.color;
    const context = this;
    setTimeout(() => rotate.call(context), +this.cases[currentIndex].dataset.speed);
}