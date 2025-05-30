// leaderboard.js
const leaderboardList = document.getElementById("leaderboard-list");
const resetButton = document.getElementById("reset-btn");

let scores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];

scores.slice().reverse().forEach(entry => {
  const li = document.createElement("li");
  li.textContent = `${entry.name} — ${entry.time} — Score: ${entry.score}`;
  leaderboardList.appendChild(li);
});

resetButton.onclick = () => {
  localStorage.removeItem("leaderboardScores");
  leaderboardList.innerHTML = "<li>Leaderboard has been reset.</li>";
};
