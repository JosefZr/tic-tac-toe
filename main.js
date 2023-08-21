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
    playerChoice = e.getAttribute("data-type");
    opponentType = e.getAttribute("data-type");
}

let choosing = document.querySelector('.choosing');
let game = document.querySelector(".game");

// Initialize playerMoves, computerMoves, and currentPlayer
let playerMoves = [];
let computerMoves = [];
let currentPlayer = "X"; // Player starts

let playerX= document.querySelector('.player-x h2');
let playerO= document.querySelector('.player-o h2');
let ties = document.querySelector('.ties h2');
let winner = document.querySelector('.winner');
let winnerH1 =document.querySelector('.winner h1'); 
    let playerCount  = 0 ;
    let robotCount = 0;
    let tiesCount =0;

function restart(){
    playerMoves = [];
    computerMoves = [];
    currentPlayer = "X";
    setTimeout(function () {
        winner.style.opacity = '0';
        setTimeout(function () {
            winner.style.display = 'none';
        }, 1000);
    }, 100);
        // Clear the game board by removing the background images
        let field = document.querySelectorAll(".field");
        field.forEach(field => {
            field.style.background = ''; // Clear the background
        });
        play()
}
function exit() {
        setTimeout(function(){
            playerCount = 0;
            robotCount = 0;
            tiesCount = 0;
            playerX.innerHTML = `${playerCount}`;
            playerO.innerHTML = `${robotCount}`;
            ties.innerHTML = `${tiesCount}`;
        },1000)

        playerMoves = [];
        computerMoves = [];
        // Clear the game board by removing the background images
        let field = document.querySelectorAll(".field");
        field.forEach(field => {
            field.style.background = ''; // Clear the background
        });

        setTimeout(function () {
            winner.style.opacity = '0';
            setTimeout(function () {
                winner.style.display = 'none';
            }, 1000);
        }, 100);    
        setTimeout(function () {
            game.style.opacity = '0';
            setTimeout(function () {
                game.style.display = 'none';
            }, 1000);
        }, 100);    

        setTimeout(function () {
            choosing.style.display = 'block';
            
            setTimeout(function () {
                choosing.style.opacity = '1';
            }, 1000);
        }, 100);
        playerChoice = "";
        opponentType = "";
}

function play() {

       // Reset game state

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
        
                if (!playerMoves.includes(i) && !computerMoves.includes(i)) {
                    if (currentPlayer === "X") {
                        playerMoves.push(i);
                        field.style.background = "url(https://zakarya-mks.github.io/tic-tac-toe_game/img/109602.svg) center/cover, #e2e8f0";
                    } else {
                        computerMoves.push(i);
                        field.style.background = "url('images/pngwing.com.png') center/cover, #e2e8f0";
                    }
        
                    // Check for a win or draw
                    let result = checkWinOrDraw(currentPlayer === "X" ? playerMoves : computerMoves, winningFormulas, currentPlayer);
                    if (result === "X") {
                        console.log("Player X wins!");
                        playerCount ++;
                        playerX.innerHTML=`${playerCount}`;
                        winnerH1.innerHTML='player takes the round'

                        setTimeout(function () {
                            winner.style.display = 'block';
                            setTimeout(function () {
                                winner.style.opacity = '1';
                            }, 100);
                        }, 100);
                    } else if (result === "O") {
                        console.log("Player O wins!");
                        robotCount ++;
                        playerO.innerHTML=`${robotCount}`;
                        winnerH1.innerHTML='computer takes the round'
                        setTimeout(function () {
                            winner.style.display = 'block';
                            setTimeout(function () {
                                winner.style.opacity = '1';
                            }, 100);
                        }, 100);
                    } else if (result === "draw") {
                        console.log("It's a draw!");
                        winnerH1.innerHTML="It's a draw!";
                        setTimeout(function () {
                            winner.style.display = 'block';
                            setTimeout(function () {
                                winner.style.opacity = '1';
                            }, 100);
                        }, 100);
                    } else {
                        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch players
                        if (currentPlayer === "O") {
                            makeComputerMove(); // Computer's turn
                        }
                    }
                }
            });
        });
        

       // Function to check for win or draw
    function checkWinOrDraw(moves, winFormulas, currentPlayer) {
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
        tiesCount ++;
        ties.innerHTML=`${tiesCount}`;
        winnerH1.innerHTML="It's a draw!";
        setTimeout(function () {
            winner.style.display = 'block';
            setTimeout(function () {
                winner.style.opacity = '1';
            }, 100);
        }, 100);
        return;
    }

    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let selectedField = availableMoves[randomIndex];
    let i = parseInt(selectedField.getAttribute("data-index"));

    computerMoves.push(i);
    selectedField.style.background = "url('images/pngwing.com.png') center/cover, #e2e8f0";

    // Check for a win or draw
    let result = checkWinOrDraw(computerMoves, winningFormulas,currentPlayer);
    if (result === "X") {
        console.log("Player X wins!");
        playerCount ++;
        playerX.innerHTML=`${playerCount}`;
        winnerH1.innerHTML='player takes the round'
        setTimeout(function () {
            winner.style.display = 'block';
            setTimeout(function () {
                winner.style.opacity = '1';
            }, 100);
        }, 100);
    } else if (result === "O") {
        console.log("Player O wins!");
        robotCount ++;
        playerO.innerHTML=`${robotCount}`;
        winnerH1.innerHTML='computer takes the round'
        setTimeout(function () {
            winner.style.display = 'block';
            setTimeout(function () {
                winner.style.opacity = '1';
            }, 100);
        }, 100);
    } else if (result === "draw") {
        console.log("It's a draw!");
        winnerH1.innerHTML="It's a draw!";
        setTimeout(function () {
            winner.style.display = 'block';
            setTimeout(function () {
                winner.style.opacity = '1';
            }, 100);
        }, 100);
    } else {
        currentPlayer = "X"; // Switch back to Player X's turn
    }
}
    }
    else if (opponentType === "player") {
        // Handle playing against another player
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
        
                if (!playerMoves.includes(i) && !computerMoves.includes(i)) {
                    if (currentPlayer === "X") {
                        playerMoves.push(i);
                        field.style.background = "url(https://zakarya-mks.github.io/tic-tac-toe_game/img/109602.svg) center/cover, #e2e8f0";
                        currentPlayer = "O"; // Switch to "O" player
                    } else {
                        playerMoves.push(i);
                        field.style.background = "url('images/pngwing.com.png') center/cover, #e2e8f0";
                        currentPlayer = "X"; // Switch to "X" player
                    }
            
                    // Check for a win or draw
                    let result = checkWinOrDraw(playerMoves, winningFormulas, currentPlayer);
                    if (result === "X") {
                        console.log("Player X wins!");
                        playerCount ++;
                        playerX.innerHTML=`${playerCount}`;
                        winnerH1.innerHTML='player takes the round';
                        setTimeout(function () {
                            winner.style.display = 'block';
                            setTimeout(function () {
                                winner.style.opacity = '1';
                            }, 100);
                        }, 100);
                    } else if (result === "O") {
                        console.log("Player O wins!");
                        robotCount ++;
                        playerO.innerHTML=`${robotCount}`;
                        winnerH1.innerHTML='computer takes the round'
                        setTimeout(function () {
                            winner.style.display = 'block';
                            setTimeout(function () {
                                winner.style.opacity = '1';
                            }, 100);
                        }, 100);
                    } else if (result === "draw") {
                        console.log("It's a draw!");
                        winnerH1.innerHTML="It's a draw!";
                        setTimeout(function () {
                            winner.style.display = 'block';
                            setTimeout(function () {
                                winner.style.opacity = '1';
                            }, 100);
                        }, 100);
                    }
                }
            });
        });
        function checkWinOrDraw(moves, winFormulas, currentPlayer) {
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
    }}