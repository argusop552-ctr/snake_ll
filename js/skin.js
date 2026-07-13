let useFriendSkin = false;

let currentFriendSkin = 0;

const friendSkins = [];

for (let i = 1; i <= 3; i++) {

    const img = new Image();

    img.onload = () => {
        console.log(`Skin teman ${i} berhasil dimuat`);
    };

    img.onerror = () => {
        console.error(`Skin teman ${i} gagal dimuat`);
    };

    img.src = `assets/teman${i}.png`;

    friendSkins.push(img);
}

function drawSkin(ctx, x, y, size) {

    const friendSkin = friendSkins[currentFriendSkin];

    if (!friendSkin || !friendSkin.complete) return;

    const cx = x + box / 2;
    const cy = y + box / 2;

    ctx.save();

    // glow tipis
    ctx.shadowBlur = 20;
    ctx.shadowColor = snakeColor;

    // potong jadi lingkaran
    ctx.beginPath();
    ctx.arc(
        cx,
        cy,
        size / 2,
        0,
        Math.PI * 2
    );
    ctx.clip();

    // gambar foto
    ctx.drawImage(
        friendSkin,
        cx - size / 2,
        cy - size / 2,
        size,
        size
    );

    ctx.restore();
}

for (let i = 1; i <= 3; i++) {

    const btn =
        document.getElementById(`friendSkin${i}`);

    if (!btn) continue;

    btn.addEventListener("click", () => {

        useFriendSkin = true;

        currentFriendSkin = i - 1;

        document
            .querySelectorAll(".color-swatch")
            .forEach(el =>
                el.classList.remove("selected")
            );

        btn.classList.add("selected");

        console.log(
            `Skin teman ${i} aktif`
        );
    });
}