// script.js

const toggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme preference and apply it globally across all pages
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggle.checked = true;
} else {
  body.classList.remove('dark');
  toggle.checked = false;
}

// Listen for changes in the theme toggle
toggle.addEventListener('change', function () {
  if (this.checked) {
    // Apply dark theme
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    // Apply light theme
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

// Start Quiz function
function startQuiz() {
  const name = document.getElementById("playerName").value.trim();
  const category = document.getElementById("category").value;
  const timer = document.getElementById("timer").value;

  // Validate Player Name
  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  // Save the player name, category, and timer to localStorage
  localStorage.setItem("playerName", name);
  localStorage.setItem("category", category);
  localStorage.setItem("timer", timer);

  // Redirect to quiz page
  window.location.href = "quiz.html";
}

// On window load, apply the theme from localStorage
window.onload = () => {
  // Check if there's a saved theme in localStorage and apply it
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    body.classList.add('dark');
    toggle.checked = true;
  } else {
    body.classList.remove('dark');
    toggle.checked = false;
  }
};
