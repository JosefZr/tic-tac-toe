// Select all elements with class "player" and "computer"
let players = document.querySelectorAll(".player");
let computer = document.querySelectorAll(".computer");
let playerChoice = "";
let opponentType = "";

function pickType(e) {
    if (e.getAttribute("data-type") === "player") {
        computer.forEach(comp => {
            comp.style.backgroundColor = "";
            comp.style.borderRadius = "";
            comp.style.padding = "";
        });

        players.forEach(player => {
            player.style.backgroundColor = "blueviolet";
            player.style.borderRadius = "1rem";
            player.style.padding = "10px";
        });
    } else {
        players.forEach(player => {
            player.style.backgroundColor = "";
            player.style.borderRadius = "";
            player.style.padding = "";
        });

        computer.forEach(comp => {
            comp.style.backgroundColor = "blueviolet";
            comp.style.borderRadius = "1rem";
            comp.style.padding = "10px";
        });
    }
    opponentType = e.getAttribute("data-type");
    playerChoice = e.getAttribute("data-type");
}

let choosing = document.querySelector('.choosing');
let game = document.querySelector(".game");

// Initialize playerMoves, computerMoves, and currentPlayer
let playerMoves = [];
let computerMoves = [];
let currentPlayer = "X"; // Player starts

function play() {
    setTimeout(function () {
        choosing.style.opacity = '0';
        setTimeout(function () {
            choosing.style.display = 'none';
        }, 1000);
    }, 100);
    setTimeout(function () {
        game.style.display = 'block';
        setTimeout(function () {
            game.style.opacity = '1';
        }, 100);
    }, 1000);

    if (playerChoice === "") {
        console.log("Please choose an opponent type first.");
        return;
    }

    console.log(`You chose to play against: ${opponentType}`);
    let field = document.querySelectorAll(".field");
    // You can add your game logic here based on the opponentType
    if (opponentType === "computer") {
        // Handle playing against computer AI
        const winningFormulas = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        field.forEach(field => {
            field.addEventListener('click', () => {
                let i = parseInt(field.getAttribute("data-index"));

                if (field.style.background.includes("url(https://zakarya-mks.github.io/tic-tac-toe_game/img/109602.svg)")) {
                    console.log("This field is already selected.");
                    return;
                }

                if (currentPlayer === "X" && !playerMoves.includes(i) && !computerMoves.includes(i)) {
                    playerMoves.push(i);
                    field.style.background = "url(https://zakarya-mks.github.io/tic-tac-toe_game/img/109602.svg) center/cover, #e2e8f0";

                    // Check for a win or draw
                    let result = checkWinOrDraw(playerMoves, winningFormulas);
                    if (result === "X") {
                        console.log("Player X wins!");
                    } else if (result === "O") {
                        console.log("Player O wins!");
                    } else if (result === "draw") {
                        console.log("It's a draw!");
                    } else {
                        // Computer's turn
                        setTimeout(makeComputerMove, 500);
                    }
                }
            });
        });

       // Function to check for win or draw
function checkWinOrDraw(moves, winFormulas) {
    for (const formula of winFormulas) {
        if (formula.every(num => moves.includes(num))) {
            return currentPlayer;
        }
    }
    if (moves.length === 9) {
        return "draw";
    }
    return null;
}

// Function to make a computer move
function makeComputerMove() {
    let availableMoves = Array.from(field).filter(f => !playerMoves.includes(parseInt(f.getAttribute("data-index"))) && !computerMoves.includes(parseInt(f.getAttribute("data-index"))));

    // Check if there are available moves for the computer
    if (availableMoves.length === 0) {
        console.log("No available moves for the computer. It's a tie!");
        return;
    }

    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let selectedField = availableMoves[randomIndex];
    let i = parseInt(selectedField.getAttribute("data-index"));

    computerMoves.push(i);
    selectedField.style.background = "url('images/pngwing.com.png') center/cover, #e2e8f0";

    // Check for a win or draw
    let result = checkWinOrDraw(computerMoves, winningFormulas);
    if (result === "X") {
        console.log("Player X wins!");
    } else if (result === "O") {
        console.log("Player O wins!");
    } else if (result === "draw") {
        console.log("It's a draw!");
    } else {
        currentPlayer = "X"; // Switch back to Player X's turn
    }
}
    }
}
