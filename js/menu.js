const playBtn =
    document.getElementById(
        "playBtn"
    );

const menu =
    document.getElementById(
        "menu"
    );

// catatan: gameContainer sudah dideklarasikan di game.js
// (game.js dimuat lebih dulu di index.html), jadi di sini
// tinggal dipakai, tidak dideklarasikan ulang.

playBtn.addEventListener(
    "click",
    () => {

        menu.style.display =
            "none";

        gameContainer.style.display =
            "flex";

        resetState();

        // siapkan audio context (butuh interaksi user dulu)
        getAudioCtx();

        clearInterval(game);

        game = setInterval(
            drawGame,
            currentDelay
        );

    }
);