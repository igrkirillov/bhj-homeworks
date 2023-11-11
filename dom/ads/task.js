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
    setTimeout(() => rotateCases.call(context), +firstCase.dataset.speed);
}

function rotateCases() {
    const context = this;
    const prevIndex = context.nextIndex === 0 ? context.cases.length - 1 : context.nextIndex - 1;
    const currentIndex = context.nextIndex;
    context.nextIndex = currentIndex === context.cases.length - 1 ? 0 : currentIndex + 1;
    context.cases[prevIndex].classList.remove("rotator__case_active");
    context.cases[currentIndex].classList.add("rotator__case_active");
    context.cases[currentIndex].style.color = context.cases[currentIndex].dataset.color;
    setTimeout(() => rotateCases.call(context), +context.cases[currentIndex].dataset.speed);
}