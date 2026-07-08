function hexToRgb(hex) {

    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r},${g},${b}`;
}

let snakeColor = "#39ff6a";
let snakeColorRgb = hexToRgb(snakeColor);

const colorSwatches =
    document.querySelectorAll(".color-swatch");

colorSwatches.forEach(btn => {

    btn.addEventListener("click", () => {

        snakeColor = btn.dataset.color;
        snakeColorRgb = hexToRgb(snakeColor);

        colorSwatches.forEach(b =>
            b.classList.remove("selected")
        );

        btn.classList.add("selected");
    });
});

// tandai warna default sebagai terpilih saat halaman dibuka
const defaultSwatch =
    document.querySelector(
        `.color-swatch[data-color="${snakeColor}"]`
    );

if (defaultSwatch) {
    defaultSwatch.classList.add("selected");
}