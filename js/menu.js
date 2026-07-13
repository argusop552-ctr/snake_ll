const playBtn = document.getElementById("playBtn");
const menu = document.getElementById("menu");

const nameSetupScreen = document.getElementById("nameSetupScreen");
const playerNameInput = document.getElementById("playerNameInput");
const nameError = document.getElementById("nameError");
const confirmNameBtn = document.getElementById("confirmNameBtn");

// catatan: gameContainer sudah dideklarasikan di game.js
// (game.js dimuat lebih dulu di index.html), jadi di sini
// tinggal dipakai, tidak dideklarasikan ulang.

function startGame() {

    menu.style.display = "none";
    nameSetupScreen.style.display = "none";
    gameContainer.style.display = "flex";

    resetState();

    // siapkan audio context (butuh interaksi user dulu)
    getAudioCtx();

    clearInterval(game);
    game = setInterval(drawGame, currentDelay);
}

playBtn.addEventListener("click", () => {

    const existingName = getPlayerName();

    if (existingName) {
        // udah pernah bikin nama sebelumnya -> langsung main
        startGame();
        return;
    }

    // belum punya nama -> tampilkan layar bikin nama dulu
    menu.style.display = "none";
    nameSetupScreen.style.display = "flex";

    playerNameInput.value = "";
    nameError.textContent = "";
    playerNameInput.focus();
});

confirmNameBtn.addEventListener("click", () => {

    const raw = playerNameInput.value.trim();

    if (raw === "") {
        nameError.textContent = "Nama nggak boleh kosong ya.";
        return;
    }

    const name = raw.slice(0, 12);

    if (isNameTaken(name)) {
        nameError.textContent = "Nama ini udah dipakai, coba nama lain.";
        return;
    }

    setPlayerName(name);
    startGame();
});

// biar bisa langsung tekan Enter buat konfirmasi nama
playerNameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        confirmNameBtn.click();
    }
});