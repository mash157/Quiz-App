let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let questions = [];  // Initialize questions array

// Fetch the selected category and timer from localStorage
const category = localStorage.getItem("category") || "computer";  // Default category
timeLeft = parseInt(localStorage.getItem("timer"), 10) || 10;  // Default timer set to 10 seconds

// Questions for each category (7 questions per category)
const allQuestions = {
  computer: [
    { question: "What is the full form of HTML?", options: ["HyperText Markup Language", "Hyperlink Text Markup Language", "Home Tool Markup Language", "None of the above"], answer: "HyperText Markup Language" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "None of the above"], answer: "Cascading Style Sheets" },
    { question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Central Processor Unit", "None of the above"], answer: "Central Processing Unit" },
    { question: "Which company developed the first computer mouse?", options: ["Apple", "Microsoft", "Xerox", "IBM"], answer: "Xerox" },
    { question: "What is the primary function of the ALU in a computer?", options: ["Performing arithmetic operations", "Storing data", "Sending data to peripherals", "Displaying data"], answer: "Performing arithmetic operations" },
    { question: "What is the purpose of an operating system?", options: ["Manage hardware resources", "Run applications", "Provide a user interface", "All of the above"], answer: "All of the above" },
    { question: "Which language is primarily used for web development?", options: ["JavaScript", "Java", "Python", "C++"], answer: "JavaScript" }
  ],
  science: [
    { question: "What is the chemical symbol for water?", options: ["H2O", "O2", "H2", "CO2"], answer: "H2O" },
    { question: "What planet is closest to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: "Mercury" },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"], answer: "Mitochondria" },
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Galileo Galilei", "Albert Einstein", "Nikola Tesla"], answer: "Albert Einstein" },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "What is the boiling point of water?", options: ["100°C", "90°C", "110°C", "120°C"], answer: "100°C" }
  ],
  math: [
    { question: "What is 5 + 5?", options: ["10", "15", "20", "25"], answer: "10" },
    { question: "What is 12 x 12?", options: ["144", "124", "132", "120"], answer: "144" },
    { question: "What is the square root of 81?", options: ["8", "9", "10", "11"], answer: "9" },
    { question: "What is 7 + 9?", options: ["16", "17", "18", "15"], answer: "16" },
    { question: "What is 18 ÷ 2?", options: ["7", "8", "9", "10"], answer: "9" },
    { question: "What is 15 - 6?", options: ["9", "10", "11", "12"], answer: "9" },
    { question: "What is 5 x 8?", options: ["40", "50", "60", "70"], answer: "40" }
  ],
  dataStructures: [
    { question: "What is a Stack?", options: ["LIFO data structure", "FIFO data structure", "Both LIFO and FIFO", "None of the above"], answer: "LIFO data structure" },
    { question: "What is the main advantage of a Linked List?", options: ["Dynamic size", "Fixed size", "Faster searching", "None of the above"], answer: "Dynamic size" },
    { question: "What is the main characteristic of a Binary Search Tree?", options: ["Sorted order", "Unsorted order", "Constant size", "None of the above"], answer: "Sorted order" },
    { question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Linked List", "Array"], answer: "Stack" },
    { question: "What does a Hash Table store?", options: ["Keys and Values", "Only Keys", "Only Values", "Arrays"], answer: "Keys and Values" },
    { question: "Which data structure allows access to elements by index?", options: ["Stack", "Queue", "Array", "Tree"], answer: "Array" },
    { question: "Which algorithm is used for sorting?", options: ["Quick Sort", "Bubble Sort", "Merge Sort", "All of the above"], answer: "All of the above" }
  ]
};

// Select questions based on category
questions = allQuestions[category] || allQuestions.computer;

function showQuestion() {
  const questionBox = document.getElementById("question");
  const optionsList = document.getElementById("options");
  const currentQuestion = questions[currentQuestionIndex];

  questionBox.textContent = currentQuestion.question;
  optionsList.innerHTML = "";
  
  // Display options dynamically
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
  timeLeft = parseInt(localStorage.getItem("timer"), 10) || 10;  // Default timer reset
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
    category: category,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("leaderboardScores", JSON.stringify(scores));
  localStorage.removeItem("playerName");
  localStorage.removeItem("category");
  localStorage.removeItem("timer");
}

window.onload = () => {
  const timerDiv = document.createElement("div");
  timerDiv.id = "timer";
  document.getElementById("quiz-box").prepend(timerDiv);
  showQuestion();
};
