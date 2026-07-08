const LEADERBOARD_KEY = "snakeLeaderboard";

function getLeaderboard() {
    try {
        const raw = localStorage.getItem(LEADERBOARD_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveLeaderboardList(list) {
    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list));
    } catch (e) {}
}

function qualifiesForLeaderboard(score) {

    if (score <= 0) return false;

    const list = getLeaderboard();

    if (list.length < 5) return true;

    return score > list[list.length - 1].score;
}

function addToLeaderboard(name, score) {

    const list = getLeaderboard();

    list.push({
        name: (name || "Anonim").slice(0, 12),
        score: score
    });

    list.sort((a, b) => b.score - a.score);

    saveLeaderboardList(list.slice(0, 5));

    renderLeaderboards();
}

function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function renderLeaderboards() {

    const list = getLeaderboard();

    const html = list.length
        ? list.map(e =>
            `<li>${escapeHtml(e.name)} — ${e.score}</li>`
          ).join("")
        : "<li>Belum ada skor</li>";

    const lobbyList =
        document.getElementById("lobbyLeaderboardList");

    const overList =
        document.getElementById("leaderboardList");

    if (lobbyList) lobbyList.innerHTML = html;
    if (overList) overList.innerHTML = html;
}

// --- form input nama saat masuk top 5 ---

let pendingScoreForEntry = null;

const nameEntry = document.getElementById("nameEntry");
const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");

function maybeShowNameEntry(score) {

    if (qualifiesForLeaderboard(score)) {
        pendingScoreForEntry = score;
        nameEntry.style.display = "flex";
        nameInput.value = "";
        nameInput.focus();
    } else {
        pendingScoreForEntry = null;
        nameEntry.style.display = "none";
    }
}

saveNameBtn.addEventListener("click", () => {

    if (pendingScoreForEntry === null) return;

    const name = nameInput.value.trim() || "Anonim";

    addToLeaderboard(name, pendingScoreForEntry);

    pendingScoreForEntry = null;
    nameEntry.style.display = "none";
});

renderLeaderboards();