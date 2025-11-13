const cells = document.querySelectorAll(".cell");
const scoreXDisplay = document.querySelector(".scoreX");
const scoreODisplay = document.querySelector(".scoreO");
const playerX = document.querySelector(".playerX");
const playerO = document.querySelector(".playerO");
const message = document.querySelector(".messege");
const reset = document.getElementById("reset");
const modeBtn = document.getElementById("mode");
const oavtar = document.querySelector(".oavtar")

const winSound = new Audio("winn.mp3");
const clickSound = new Audio("write.mp3");
const drwSound = new Audio("draw.mp3");

let turn = "X";
let scoreX = 0;
let scoreO = 0;
let vsComputer = true; 
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


message.innerText = "X turn (You)";
modeBtn.innerText = "Multiplayer Mode";


cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "" || gameOver) return;
    if (vsComputer && turn === "O") return;

    makeMove(cell, turn);
    if (checkWinner()) return;

    turn = turn === "X" ? "O" : "X";
    message.innerText = `${turn} turn`;

    if (vsComputer && turn === "O") {
      setTimeout(computerMove, 500);
    }
  });
});


function makeMove(cell, symbol) {
  clickSound.currentTime = 0;
  clickSound.play();
  cell.innerText = symbol;
  cell.classList.add(symbol.toLowerCase());
}


function computerMove() {
  if (gameOver) return;

  const emptyCells = [...cells].filter((c) => c.innerText === "");
  if (emptyCells.length === 0) return;

  
  for (let combo of winPatterns) {
    const [a, b, c] = combo;
    const vals = [cells[a].innerText, cells[b].innerText, cells[c].innerText];
    if (vals.filter((v) => v === "O").length === 2 && vals.includes("")) {
      const index = combo[vals.indexOf("")];
      makeMove(cells[index], "O");
      finalizeMove();
      return;
    }
  }

  
  for (let combo of winPatterns) {
    const [a, b, c] = combo;
    const vals = [cells[a].innerText, cells[b].innerText, cells[c].innerText];
    if (vals.filter((v) => v === "X").length === 2 && vals.includes("")) {
      const index = combo[vals.indexOf("")];
      makeMove(cells[index], "O");
      finalizeMove();
      return;
    }
  }

  
  const center = cells[4];
  if (center.innerText === "" && Math.random() < 0.6) {
    makeMove(center, "O");
    finalizeMove();
    return;
  }

  
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomCell, "O");
  finalizeMove();
}

function finalizeMove() {
  if (checkWinner()) return;
  turn = "X";
  message.innerText = "X turn (You)";
}


function checkWinner() {
  for (const [a, b, c] of winPatterns) {
    const val1 = cells[a].innerText;
    const val2 = cells[b].innerText;
    const val3 = cells[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      gameOver = true;
      winSound.currentTime = 0;
      winSound.play();

      message.classList.add("big");
      message.innerText = `${val1} wins 🎉`;
      setTimeout(() => message.classList.remove("big"), 800);

      cells.forEach((cell) => (cell.style.pointerEvents = "none"));

      if (val1 === "X") {
        scoreX++;
        scoreXDisplay.innerText = scoreX;
        playerX.classList.add("plus");
      } else {
        scoreO++;
        scoreODisplay.innerText = scoreO;
        playerO.classList.add("plus");
      }

      setTimeout(() => {
        resetBoard();
        playerX.classList.remove("plus");
        playerO.classList.remove("plus");
      }, 1200);
      return true;
    }
  }

  
  const allFilled = [...cells].every((c) => c.innerText !== "");
  if (allFilled && !gameOver) {
    gameOver = true;
    message.innerText = "It's a Draw! 🤝";
    message.classList.add("big");
    drwSound.currentTime = 0;
    drwSound.play();
    setTimeout(() => {
      message.classList.remove("big");
      resetBoard();
    }, 1000);
    return true;
  }

  return false;
}


function resetBoard() {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("x", "o");
    cell.style.pointerEvents = "auto";
  });
  turn = "X";
  gameOver = false;
  message.innerText = vsComputer ? "X turn (You)" : "X turn";

  if (vsComputer && turn === "O") {
    setTimeout(computerMove, 500);
  }
}


reset.addEventListener("click", () => {
  scoreX = 0;
  scoreO = 0;
  scoreXDisplay.innerText = scoreX;
  scoreODisplay.innerText = scoreO;
  resetBoard();
});


modeBtn.addEventListener("click", () => {
  vsComputer = !vsComputer;
  modeBtn.innerText = vsComputer ? "Multiplayer Mode" : "Play vs Computer";
  if (vsComputer) {
    oavtar.src = "player-computer.png"
  }else if(!vsComputer){
    oavtar.src = "player-O.png"
  }
  message.innerText = vsComputer ? "X turn (You)" : "X turn";
  scoreX = 0;
  scoreO = 0;
  scoreXDisplay.innerText = scoreX;
  scoreODisplay.innerText = scoreO;

  resetBoard();
});
