// quiz.js
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function showQuestion() {
  const questionBox = document.getElementById("question");
  const optionsList = document.getElementById("options");
  const currentQuestion = questions[currentQuestionIndex];

  questionBox.textContent = currentQuestion.question;
  optionsList.innerHTML = "";
  currentQuestion.options.forEach(option => {
    const div = document.createElement("div");
    div.textContent = option;
    div.className = "option-card";
    div.onclick = () => selectOption(option);
    optionsList.appendChild(div);
  });

  resetTimer();
  startTimer();
}

function selectOption(selectedOption) {
  stopTimer();
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    saveScore();
    window.location.href = "leaderboard.html";
  }
}

function startTimer() {
  const timerBox = document.getElementById("timer");
  timerBox.textContent = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerBox.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft === 0) {
      stopTimer();
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        saveScore();
        window.location.href = "leaderboard.html";
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
}

function stopTimer() {
  clearInterval(timer);
}

function saveScore() {
  const playerName = localStorage.getItem("playerName") || "Anonymous";
  let scores = JSON.parse(localStorage.getItem("leaderboardScores")) || [];
  scores.push({
    name: playerName,
    score: score,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("leaderboardScores", JSON.stringify(scores));
  localStorage.removeItem("playerName");
}

window.onload = () => {
  const timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  document.getElementById("quiz-box").prepend(timerDiv);
  showQuestion();
};