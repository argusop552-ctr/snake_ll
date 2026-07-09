const box = 20;

let food = createFood();

function createFood() {

    const pos = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    // makanan spesial: 15% bonus skor, 15% efek lambat, sisanya biasa
    const roll = Math.random();
    let type = "normal";

    if (roll < 0.15) {
        type = "bonus";
    } else if (roll < 0.3) {
        type = "slow";
    }

    return {
        x: pos.x,
        y: pos.y,
        type: type
    };
}

function drawFood(ctx) {

    const cx = food.x + box / 2;
    const cy = food.y + box / 2;

    const pulse = 1 + Math.sin(Date.now() / 150) * 0.15;

    let color = "#ff3860"; // normal = merah

    if (food.type === "bonus") {
        color = "#ffd23f"; // bonus = emas
    } else if (food.type === "slow") {
        color = "#00e5ff"; // slow = cyan
    }

    ctx.save();

    ctx.shadowBlur = 20;
    ctx.shadowColor = color;

    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(
        cx,
        cy,
        (box / 2.4) * pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.restore();
}