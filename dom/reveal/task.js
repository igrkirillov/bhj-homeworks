const revealBlocks = Array.from(document.querySelectorAll("div.reveal"));
window.addEventListener("scroll", updateRevealActivityOfBlocks)

function updateRevealActivityOfBlocks() {
    for (const revealBlock of revealBlocks) {
        const rect = revealBlock.getBoundingClientRect();
        const isBlockVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (isBlockVisible) {
            revealBlock.classList.add("reveal_active");
        } else {
            revealBlock.classList.remove("reveal_active");
        }
    }
}