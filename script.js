// selecting elements from html

const gridBox = document.getElementById("gridBox");
const playerName = document.getElementById("playerName");
const resetBtn = document.getElementById("reset");
const resultPopup = document.getElementById("resultPopup");
const resultText = document.getElementById("resultText");
const playAgainBtn = document.getElementById("playAgain");

// current player
// 1 -> player 1
// 2 -> player 2

let currentPlayer = 1;

// game over condition
let gameOver = false;

// creating empty board
// 6 rows and 7 columns
let board = [];
for (let i = 0; i < 6; i++) {
    board[i] = Array(7).fill(0);
}

// updating player text
playerName.innerText = "Player 1 Turn";


// function to create grid dynamically
function createBoard() {

    // clearing old board before creating new one
    gridBox.innerHTML = "";

    // loop for total 42 cells
    for(let row = 0; row < 6; row++){
        for(let col = 0; col < 7; col++){
            // creating cell container
            let cell = document.createElement("div");
            cell.classList.add("cell");

            let button = document.createElement("button"); // creating clickable button
            
            button.row = row;
            button.col = col;

            button.addEventListener("click", handleClick);  // adding click event
            cell.appendChild(button);  // putting button inside cell
            gridBox.appendChild(cell);  // putting cell inside grid
        }
    }
}


// function runs whenever user clicks any button
function handleClick(e) {

    // stop game if already over
    if (gameOver) {
        return;
    }

    let row = e.target.row;
    let col = e.target.col;

    // if already filled then overwrite not allowed
    if (board[row][col] !== 0) {
        return;
    }

    // player 1 move
    if (currentPlayer === 1) {
        board[row][col] = 1;
        e.target.classList.add("player1");
        currentPlayer = 2;
        playerName.innerText = "Player 2 Turn";
    }

    // player 2 move
    else {
        board[row][col] = 2;
        e.target.classList.add("player2");
        currentPlayer = 1;
        playerName.innerText = "Player 1 Turn";
    }



    // checking winner after every move
    if (checkWinner()) {
        gameOver = true;
        if (currentPlayer === 1) {
           showPopup("🎉 Player 2 Wins!");
        }
        else {
            showPopup("🎉 Player 1 Wins!");
        }
    }

    // checking draw condition
    checkDraw();
}



// function to check winner
function checkWinner() {

    // horizontal checking
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let value = board[row][col];
            if (
                value !== 0 &&
                value === board[row][col + 1] &&
                value === board[row][col + 2] &&
                value === board[row][col + 3]
            ) {
                return true;
            }
        }
    }

    // vertical checking
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            let value = board[row][col];
            if (
                value !== 0 &&
                value === board[row + 1][col] &&
                value === board[row + 2][col] &&
                value === board[row + 3][col]
            ) {
                return true;
            }
        }
    }

    // diagonal checking
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            let value = board[row][col];
            if (
                value !== 0 &&
                value === board[row + 1][col + 1] &&
                value === board[row + 2][col + 2] &&
                value === board[row + 3][col + 3]
            ) {
                return true;
            }
        }
    }

    // opposite diagonal checking
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let value = board[row][col];
            if (
                value !== 0 &&
                value === board[row - 1][col + 1] &&
                value === board[row - 2][col + 2] &&
                value === board[row - 3][col + 3]
            ) {
                return true;
            }
        }
    }

    return false;
}

// checking draw
function checkDraw() {
    let filled = true;
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (board[row][col] === 0) {
                filled = false;
            }
        }
    }


    if (filled && !gameOver) {
        showPopup("🤝 Match Draw!");
        gameOver = true;
    }
}

//function to show Popup
function showPopup(message){
    resultText.innerText = message;
    resultPopup.classList.remove("hidden");
}

// reset button
resetBtn.addEventListener("click", resetGame);
// play again button
playAgainBtn.addEventListener("click", resetGame);

// reset function
function resetGame(){
    // hiding popup again
    resultPopup.classList.add("hidden");
    // resetting values
    currentPlayer = 1;
    gameOver = false;
    playerName.innerText = "Player 1 Turn";
    // making fresh board again
    board = [];
    for(let i = 0; i < 6; i++){
        board[i] = Array(7).fill(0);
    }
    // recreating UI
    createBoard();
}

// initial board creation
createBoard();