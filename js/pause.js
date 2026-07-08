const pauseBtn = document.getElementById("pauseBtn");
const pauseScreen = document.getElementById("pauseScreen");
const lobbyBtn = document.getElementById("lobbyBtn");
const resumeBtn = document.getElementById("resumeBtn");

pauseScreen.style.display = "none";

let isPaused = false;

function pauseGame() {

    if (isPaused) return;

    isPaused = true;

    clearInterval(game);

    pauseScreen.style.display = "flex";
}

function resumeGame() {

    if (!isPaused) return;

    isPaused = false;

    pauseScreen.style.display = "none";

    game = setInterval(drawGame, currentDelay);
}

function goToLobby() {

    isPaused = false;

    clearInterval(game);

    pauseScreen.style.display = "none";
    gameContainer.style.display = "none";

    // biar game bersih & siap dimainkan lagi dari awal
    resetState();

    menu.style.display = "flex";
}

pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);
lobbyBtn.addEventListener("click", goToLobby);