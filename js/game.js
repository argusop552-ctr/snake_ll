const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gameContainer = document.getElementById("gameContainer");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreEl = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// pastikan layar game over tersembunyi saat pertama kali dibuka
gameOverScreen.style.display = "none";

let game = null;
let currentDelay = 20;
let slowTimeout = null;

function triggerSlowEffect() {

    if (slowTimeout) {
        clearTimeout(slowTimeout);
    }

    // perlambat sementara
    currentDelay = 35;

    clearInterval(game);
    game = setInterval(drawGame, currentDelay);

    slowTimeout = setTimeout(() => {

        if (!isPaused && gameContainer.style.display !== "none") {

            // kembali ke kecepatan normal
            currentDelay = 20;

            clearInterval(game);
            game = setInterval(drawGame, currentDelay);
        }

        slowTimeout = null;

    }, 3000);
}

function drawGrid() {

    ctx.strokeStyle = "#0c1a12";

    for (
        let i = 0;
        i < 400;
        i += box
    ) {

        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
    }
}

function gameOver() {

    clearInterval(game);

    // suara game over
    playGameOverSound();

    // cek & simpan skor tertinggi
    checkHighScore();

    // tampilkan skor akhir di layar game over
    finalScoreEl.textContent = getScore();

    // simpan ke leaderboard (otomatis dedup & simpan skor terbaik per nama)
    addToLeaderboard(getPlayerName() || "Anonim", getScore());

    // sembunyikan area main, tampilkan layar game over
    gameContainer.style.display = "none";
    gameOverScreen.style.display = "flex";
}

function resetState() {

    // reset posisi & arah snake
    snake = [
        {
            x: 180,
            y: 200
        }
    ];

    trail = [];
    snakeLength = 1;
    direction = "";

    // reset makanan & skor
    food = createFood();
    resetScore();

    // reset kecepatan ke normal
    currentDelay = 20;
}

function resetGame() {

    resetState();

    // kembali ke layar main
    gameOverScreen.style.display = "none";
    gameContainer.style.display = "flex";

    // mulai ulang loop game
    clearInterval(game);
    game = setInterval(drawGame, currentDelay);
}

restartBtn.addEventListener("click", resetGame);

function drawGame() {

    ctx.fillStyle = "#000";
    ctx.fillRect(
        0,
        0,
        400,
        400
    );

    drawGrid();

    drawFood(ctx);

    let headX = snake[0].x;
    let headY = snake[0].y;

    let speed = 5;

    if (direction === "LEFT")
        headX -= speed;

    if (direction === "RIGHT")
        headX += speed;

    if (direction === "UP")
        headY -= speed;

    if (direction === "DOWN")
        headY += speed;

    if (
        Math.abs(headX - food.x) < box &&
        Math.abs(headY - food.y) < box
    ) {

        if (food.type === "bonus") {
            addScore(5);
            snakeLength += 4;
        } else if (food.type === "slow") {
            addScore(1);
            snakeLength += 2;
            triggerSlowEffect();
        } else {
            addScore(1);
            snakeLength += 2;
        }

        playEatSound();

        food = createFood();

    }

    if (
        headX < 0 ||
        headY < 0 ||
        headX >= 400 ||
        headY >= 400
    ) {
        gameOver();
        return;
    }

    // tabrak badan sendiri (skip segmen dekat kepala biar tidak salah deteksi)
    for (let i = 10; i < snake.length; i++) {
        const seg = snake[i];
        if (
            Math.abs(headX - seg.x) < box * 0.6 &&
            Math.abs(headY - seg.y) < box * 0.6
        ) {
            gameOver();
            return;
        }
    }

    trail.unshift({
        x: headX,
        y: headY
    });

    let maxLength =
        30 + snakeLength * 2;

    while (
        trail.length > maxLength
    ) {
        trail.pop();
    }

    snake =
        trail.slice(
            0,
            snakeLength
        );

    snake.unshift({
        x: headX,
        y: headY
    });

    if (useFriendSkin) {

    for (let i = snake.length - 1; i >= 1; i -= 3) {

        const seg = snake[i];

        const t = i / snake.length;

        const size =
    Math.max(
        16,
        24 - (t * 14)
    );

        drawSkin(
            ctx,
            seg.x,
            seg.y,
            size
        );
    }

    const head = snake[0];

    drawSkin(
        ctx,
        head.x,
        head.y,
        25
    );

} else {

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (
        let i = 1;
        i < snake.length;
        i++
    ) {

        const p0 = snake[i - 1];
        const p1 = snake[i];

        const jumpX = Math.abs(p0.x - p1.x);
        const jumpY = Math.abs(p0.y - p1.y);

        if (jumpX > box * 2 || jumpY > box * 2) {
            continue;
        }

        const t = i / snake.length;

        const width =
            Math.max(
                box * 0.28,
                box * 0.85 * (1 - t * 0.65)
            );

        const alpha =
            Math.max(
                0.3,
                1 - t * 0.75
            );

        ctx.shadowBlur = 12;
        ctx.shadowColor = snakeColor;

        ctx.strokeStyle =
            `rgba(${snakeColorRgb},${alpha})`;

        ctx.lineWidth = width;

        ctx.beginPath();

        ctx.moveTo(
            p0.x + box / 2,
            p0.y + box / 2
        );

        ctx.lineTo(
            p1.x + box / 2,
            p1.y + box / 2
        );

        ctx.stroke();

        ctx.shadowBlur = 0;
    }

    const head = snake[0];

    const x = head.x + box / 2;
    const y = head.y + box / 2;

    let angle = 0;

    if (direction === "RIGHT") angle = 0;
    if (direction === "DOWN") angle = Math.PI / 2;
    if (direction === "LEFT") angle = Math.PI;
    if (direction === "UP") angle = -Math.PI / 2;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.shadowBlur = 25;
    ctx.shadowColor = snakeColor;

    ctx.fillStyle = snakeColor;

    ctx.beginPath();
    ctx.arc(0, 0, box / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.fillStyle = "black";
    ctx.fillRect(5, -5, 3, 3);
    ctx.fillRect(5, 5, 3, 3);

    ctx.restore();
}

snake[0] = {
    x: headX,
    y: headY
};
}