let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

document.querySelector("#r-icon").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector("#p-icon").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector("#s-icon").addEventListener("click", () => {
  playGame("scissors");
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose.";
    } else if (computerMove === "paper") {
      result = "You Win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You Lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You Lose.";
    } else if (computerMove === "scissors") {
      result = "You Win.";
    }
  }

  if (result === "You Win.") {
    score.wins += 1;
  } else if (result === "You Lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }


  if (score.wins === 10) {
    result = "You Win! You've scored 10 wins before AI Sally could.";
  }

  if (score.losses === 10) {
    result = "You Lose! AI Sally has scored 10 wins before you could.";
  }

  function reset() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
  }

  if (score.wins === 10 || score.losses === 10) {
    reset();
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".main-result").innerHTML = result;

  document.querySelector(
    ".main-moves"
  ).innerHTML = `You chose ${playerMove} --- AI Sally chose ${computerMove}.`;
}

function updateScoreElement() {
  document.querySelector(
    ".main-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
