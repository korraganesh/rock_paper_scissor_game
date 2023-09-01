// Prevent animation on load after 500 milliseconds
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);


// Array of possible choices in the game
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

// Select various elements from the HTML
const rulesButton = document.getElementById("rules-button"); // Rules button
const rulesPopup = document.getElementById("rules-popup"); // Rules popup
const closeButton = document.getElementById("close-button"); // Close button within the popup

const choiceButtons = document.querySelectorAll(".choice-btn"); // All choice buttons
const gameDiv = document.querySelector(".game"); // Game section
const resultsDiv = document.querySelector(".results"); // Results section
const resultDivs = document.querySelectorAll(".results__result"); // Result containers

const resultWinner = document.querySelector(".results__winner"); // Winner information container
const resultText = document.querySelector(".results__text"); // Text indicating the result
const resultText1 = document.querySelector(".results__text11"); // Additional result text

const playAgainBtn = document.querySelector(".play-again"); // Play again button
const congratsSection = document.querySelector(".congrats"); // Congratulations section

const aiScoreNumber = document.querySelector(".ai-score .score__number"); // AI's score
let aiScore = 0; // Initialize AI's score

const scoreNumber = document.querySelector(".score .score__number"); // User's score
let score = 0; // Initialize user's score

// Function to show the congratulations message
function showCongrats() {
  congratsSection.classList.remove("hidden");
}

// Function to hide the congratulations message
function hideCongrats() {
  congratsSection.classList.add("hidden");
}

// Load scores from local storage (if available)
score = parseInt(localStorage.getItem("userScore")) || 0;
aiScore = parseInt(localStorage.getItem("aiScore")) || 0;
updateUIScores();

// Function to update the displayed scores
function updateUIScores() {
  scoreNumber.innerText = score;
  aiScoreNumber.innerText = aiScore;
}

// Function to update scores in local storage
function updateLocalStorageScores() {
  localStorage.setItem("userScore", score);
  localStorage.setItem("aiScore", aiScore);
}
// Function to update the button text based on the game result
function updateButtonText(isTie) {
  const playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.innerText = isTie ? "REPLAY" : "PLAY AGAIN";
}


// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

// Player's choice function
function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

// AI's choice function
function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

// Function to display the game results
function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}


// Function to display the game winner
function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "YOU WIN ";
      resultText1.innerText = " AGAINST PC";
      resultDivs[0].classList.toggle("winner");
      showCongrats(); // Display congratulations
      keepScore(1); // Update user's score
      updateAIScore(0); // Update AI's score (AI loses)
      congratsSection.classList.remove("hidden"); // Show the "Next" button
    } else if (aiWins) {
      resultText.innerText = "YOU LOST";
      resultText1.innerText = " AGAINST PC";
      resultDivs[1].classList.toggle("winner");
      hideCongrats();
      keepScore(0); // Update user's score (user loses)
      updateAIScore(1); // Update AI's score (AI wins)
      congratsSection.classList.add("hidden"); // Hide the "Next" button
    } else {
      resultText.innerText = "TIE UP";
      resultText1.innerText = "";
      hideCongrats();
      congratsSection.classList.add("hidden"); // Hide the "Next" button
      updateButtonText(true);
    }
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

// Function to check if a player is the winner
function isWinner(results) {
  return results[0].beats === results[1].name;
}

// Function to update and keep track of the user's score
function keepScore(point) {
  score = Math.max(score + point, 0);
  updateUIScores();
  updateLocalStorageScores();
}

// Function to update and keep track of AI's score
function updateAIScore(point) {
  aiScore += point;
  updateUIScores();
  updateLocalStorageScores();
}

// Play Again button event listener
playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");

  updateButtonText(false);
});

// Show/Hide Rules
rulesButton.addEventListener("click", () => {
  rulesPopup.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  rulesPopup.style.display = "none";
});

// Show/Hide Rules
 

rulesButton.addEventListener("click", () => {
  rulesPopup.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  rulesPopup.style.display = "none";
});


