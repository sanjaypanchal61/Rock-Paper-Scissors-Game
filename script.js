let allemoji = document.querySelectorAll(".emoji");
let resultMsg = document.querySelector(".result-msg");
let userScore = document.getElementById("user-score");
let computerScore = document.getElementById("comp-score");
let drawScore = document.getElementById("draw-score");

// Load from localStorage or set default values
let userCount = parseInt(localStorage.getItem("userScore")) || 0;
let compCount = parseInt(localStorage.getItem("compScore")) || 0;
let drawCount = parseInt(localStorage.getItem("drawScore")) || 0;
let lastResult = localStorage.getItem("lastResult") || "Let's play!";

// initial values to UI
userScore.textContent = userCount;
computerScore.textContent = compCount;
drawScore.textContent = drawCount;
resultMsg.textContent = lastResult;

// Main code logic
let checkWinner = (computerSelect, userSelect) => {
    if (computerSelect === userSelect) {
        resultMsg.textContent = "It's a tie!";
        resultMsg.setAttribute("class", "yellow");
        drawScore.style.color = "yellow";
        drawScore.textContent = ++drawCount;
    } else if (
        (userSelect === "rock" && computerSelect === "scissors") ||
        (userSelect === "paper" && computerSelect === "rock") ||
        (userSelect === "scissors" && computerSelect === "paper")
    ) {
        resultMsg.textContent = `You win! ${userSelect} beats ${computerSelect}`;
        resultMsg.setAttribute("class", "green");
        userScore.style.color = "rgb(74, 229, 74)";
        userScore.textContent = ++userCount;
    } else {
        resultMsg.textContent = `Computer win! ${computerSelect} beats ${userSelect}`;
        resultMsg.setAttribute("class", "red");
        computerScore.style.color = "red";
        computerScore.textContent = ++compCount;
    }

    // Save in localStorage
    localStorage.setItem("userScore", userCount);
    localStorage.setItem("compScore", compCount);
    localStorage.setItem("drawScore", drawCount);
    localStorage.setItem("lastResult", resultMsg.textContent);
};

// computer choice
let compChoice = (userSelect) => {
    let choices = ["rock", "paper", "scissors"];
    let randNum = Math.floor(Math.random() * 3);
    let computerSelect = choices[randNum];
    checkWinner(computerSelect, userSelect);
};

// user choice
allemoji.forEach((emoji) => {
    emoji.addEventListener("click", (e) => {
        let userSelect = e.target.id;
        compChoice(userSelect);
    });
});

// restart button features
document.getElementById("restart-btn").addEventListener("click", () => {
    localStorage.clear();
    // UI data remove 
    location.reload();
});


