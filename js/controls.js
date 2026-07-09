const btnUp = document.getElementById("btnUp");
const btnDown = document.getElementById("btnDown");
const btnLeft = document.getElementById("btnLeft");
const btnRight = document.getElementById("btnRight");

function bindTouchButton(el, dir) {

    if (!el) return;

    // touchstart biar responnya cepat & nggak nunggu delay klik di HP
    el.addEventListener("touchstart", e => {
        e.preventDefault();
        setDirection(dir);
    }, { passive: false });

    // tetap dukung klik biasa (misal dites pakai mouse)
    el.addEventListener("click", () => {
        setDirection(dir);
    });
}

bindTouchButton(btnUp, "UP");
bindTouchButton(btnDown, "DOWN");
bindTouchButton(btnLeft, "LEFT");
bindTouchButton(btnRight, "RIGHT");