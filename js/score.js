let score = 0;
let highScore = 0;

// muat skor tertinggi yang tersimpan di browser (kalau ada)
try {
    const saved = localStorage.getItem("snakeHighScore");
    if (saved !== null) {
        highScore = parseInt(saved, 10) || 0;
    }
} catch (e) {}

function resetScore() {
    score = 0;
    updateScore();
}

function addScore(amount = 1) {
    score += amount;
    updateScore();
}

function updateScore() {

    const scoreElement =
        document.getElementById("score");

    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function getScore() {
    return score;
}

function updateHighScoreDisplays() {

    const lobbyEl =
        document.getElementById("highScoreLobby");

    const overEl =
        document.getElementById("highScoreOver");

    if (lobbyEl) lobbyEl.textContent = highScore;
    if (overEl) overEl.textContent = highScore;
}

function checkHighScore() {

    if (score > highScore) {

        highScore = score;

        try {
            localStorage.setItem("snakeHighScore", highScore);
        } catch (e) {}
    }

    updateHighScoreDisplays();
}

// tampilkan skor tertinggi begitu halaman dibuka
updateHighScoreDisplays();