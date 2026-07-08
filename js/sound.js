let audioCtx = null;

function getAudioCtx() {

    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    return audioCtx;
}

function playBeep(freq, duration, type = "square") {

    try {

        const ctxA = getAudioCtx();

        const osc = ctxA.createOscillator();
        const gain = ctxA.createGain();

        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = 0.06;

        osc.connect(gain);
        gain.connect(ctxA.destination);

        osc.start();

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            ctxA.currentTime + duration
        );

        osc.stop(ctxA.currentTime + duration);

    } catch (e) {}
}

function playEatSound() {
    playBeep(880, 0.08);
}

function playGameOverSound() {
    playBeep(140, 0.35, "sawtooth");
}