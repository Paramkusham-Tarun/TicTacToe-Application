// ==============================
// GAME VARIABLES
// ==============================

const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const newGameBtn = document.getElementById("newGameBtn");

const resetScoreBtn = document.getElementById("resetScoreBtn");

const scoreXElement = document.getElementById("scoreX");

const scoreOElement = document.getElementById("scoreO");

const scoreDrawElement = document.getElementById("scoreDraw");


// Game board

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


// Current player

let currentPlayer = "X";


// Game state

let gameActive = true;


// Scores

let scoreX = 0;

let scoreO = 0;

let scoreDraw = 0;


// Winning combinations

const winningCombinations = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


// ==============================
// CELL CLICK
// ==============================

cells.forEach(cell => {

    cell.addEventListener("click", handleCellClick);

});


function handleCellClick(event) {

    const cell = event.target;

    const index = cell.dataset.index;


    // Don't allow clicking filled cell

    if (board[index] !== "" || !gameActive) {

        return;

    }


    // Add player move

    board[index] = currentPlayer;

    cell.textContent = currentPlayer;


    // Add CSS class

    cell.classList.add(
        currentPlayer.toLowerCase()
    );


    // Check winner

    checkGameResult();

}


// ==============================
// CHECK GAME RESULT
// ==============================

function checkGameResult() {

    let winningCombination = null;


    for (const combination of winningCombinations) {

        const [a, b, c] = combination;


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            winningCombination = combination;

            break;

        }

    }


    // Winner

    if (winningCombination) {

        gameActive = false;


        winningCombination.forEach(index => {

            cells[index].classList.add("winner");

        });


        statusText.textContent =
            `🎉 Player ${currentPlayer} Wins!`;


        updateScore(currentPlayer);


        return;

    }


    // Draw

    if (!board.includes("")) {

        gameActive = false;

        scoreDraw++;

        scoreDrawElement.textContent = scoreDraw;

        statusText.textContent = "🤝 It's a Draw!";

        return;

    }


    // Change player

    currentPlayer =
        currentPlayer === "X" ? "O" : "X";


    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;

}


// ==============================
// UPDATE SCORE
// ==============================

function updateScore(player) {

    if (player === "X") {

        scoreX++;

        scoreXElement.textContent = scoreX;

    } else {

        scoreO++;

        scoreOElement.textContent = scoreO;

    }

}


// ==============================
// NEW GAME
// ==============================

newGameBtn.addEventListener(
    "click",
    startNewGame
);


function startNewGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    currentPlayer = "X";

    gameActive = true;


    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
            "x",
            "o",
            "winner"
        );

    });


    statusText.textContent =
        "Player X's Turn";

}


// ==============================
// RESET SCORE
// ==============================

resetScoreBtn.addEventListener(
    "click",
    resetScores
);


function resetScores() {

    scoreX = 0;

    scoreO = 0;

    scoreDraw = 0;


    scoreXElement.textContent = "0";

    scoreOElement.textContent = "0";

    scoreDrawElement.textContent = "0";


    startNewGame();

}