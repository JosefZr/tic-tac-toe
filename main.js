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
function play() {
    setTimeout(function() {
        choosing.style.opacity='0';
        setTimeout(function() {
            choosing.style.display='none';
        }, 1000);
    }, 100);
    setTimeout(function() {
        game.style.display='block';
        setTimeout(function() {
        game.style.opacity='1';
        }, 100);
    }, 1000);
    
    if (playerChoice === "") {
        console.log("Please choose an opponent type first.");
        return;
    }

    console.log(`You chose to play against: ${opponentType}`);
    
    // You can add your game logic here based on the opponentType
    if (opponentType === "computer") {
        // Handle playing against computer AI
        console.log("Playing against computer AI...");
    } else {
        // Handle playing against another player
        console.log("Playing against another player...");
    }
}