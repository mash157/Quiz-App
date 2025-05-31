function loadLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard-list");
  const scores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];
  leaderboardList.innerHTML = '';
  scores.sort((a, b) => b.score - a.score);  // Sort by score in descending order
  scores.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name} - ${entry.score} - ${entry.category} - ${entry.time}`;
    leaderboardList.appendChild(li);
  });
}

function resetLeaderboard() {
  localStorage.removeItem("leaderboardScores");
  loadLeaderboard();
}

function goHome() {
  window.location.href = "index.html";
}

window.onload = loadLeaderboard;
