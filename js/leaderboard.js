const LEADERBOARD_KEY = "snakeLeaderboard";
const PLAYER_NAME_KEY = "snakePlayerName";

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

// cek apakah nama itu udah kepake di leaderboard (nggak peduli besar/kecil huruf)
function isNameTaken(name) {

    const list = getLeaderboard();

    return list.some(
        e => e.name.toLowerCase() === name.toLowerCase()
    );
}

function addToLeaderboard(name, score) {

    if (score <= 0) return;

    const list = getLeaderboard();

    const existingIndex = list.findIndex(
        e => e.name.toLowerCase() === name.toLowerCase()
    );

    if (existingIndex !== -1) {

        // nama udah ada -> update cuma kalau skor barunya lebih tinggi
        if (score > list[existingIndex].score) {
            list[existingIndex].score = score;
        }

    } else {

        list.push({
            name: (name || "Anonim").slice(0, 12),
            score: score
        });
    }

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

// --- nama pemain: ditanya SEKALI aja lewat layar custom, disimpan permanen ---

function getPlayerName() {
    try {
        return localStorage.getItem(PLAYER_NAME_KEY);
    } catch (e) {
        return null;
    }
}

function setPlayerName(name) {
    try {
        localStorage.setItem(PLAYER_NAME_KEY, name);
    } catch (e) {}
}

renderLeaderboards();