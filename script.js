let playerOne = {
  name: "Player One",
  symbol: "X",
  turn: true,
  score: 0,
};

let playerTwo = {
  name: "Player Two",
  symbol: "O",
  turn: false,
  score: 0,
};

const toggle = document.querySelector(".toggle-input");
const toggleText = document.querySelector(".toggle-text");
let darkMode = localStorage.getItem("darkMode");

const boxes = document.querySelectorAll(".box");
const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const box5 = document.querySelector(".box-5");
const box6 = document.querySelector(".box-6");
const box7 = document.querySelector(".box-7");
const box8 = document.querySelector(".box-8");
const box9 = document.querySelector(".box-9");
const symbols = document.querySelectorAll(".symbol");
const board = Array(boxes.length);
board.fill(null);

const lineStrike = document.querySelector("#strike-line");

const winningCombos = [
  // rows
  { combo: [1, 2, 3], lineStrikeClass: "row-1" },
  { combo: [4, 5, 6], lineStrikeClass: "row-2" },
  { combo: [7, 8, 9], lineStrikeClass: "row-3" },
  // columns
  { combo: [1, 4, 7], lineStrikeClass: "column-1" },
  { combo: [2, 5, 8], lineStrikeClass: "column-2" },
  { combo: [3, 6, 9], lineStrikeClass: "column-3" },
  // diagonals
  { combo: [1, 5, 9], lineStrikeClass: "diagonal-1" },
  { combo: [3, 5, 7], lineStrikeClass: "diagonal-2" },
];

const alertModal = document.querySelector(".alert");
const dialog = document.querySelector(".winner");
// dialog.returnValue = "The Winner!";

const playerOneClick = new Audio("sounds/lm_ghost_vanishes.wav");
const playerTwoClick = new Audio("sounds/smsunshine_talk_start.wav");
// const playerOneClick = new Audio("sounds/lm_inventory-open.wav");
// const playerTwoClick = new Audio("sounds/lm_inventory-close.wav");
const winnerSound = new Audio("sounds/lm_pickup_key.wav");
const tieSound = new Audio("sounds/lm_boss_key.wav");

const confirmBtn = document.querySelector(".confirm");
const restartBtn = document.querySelector(".restart");

const turnText = document.querySelector(".turn");

const playerOneScore = document.querySelector("#one-score");
const playerTwoScore = document.querySelector("#two-score");
const tieCounter = document.querySelector("#tie-score");
let tieNum = 0;

let symbolNum = 0;

const drawSymbol = (event) => {
  const symbol = document.querySelector(`.symbol-${symbolNum + 1}`);
  const box = document.querySelector(`.box-${symbolNum + 1}`);
  const clickedBox = event.target;
  const clickedBoxNum = clickedBox.dataset.indexNumber;
  console.log("clickedBoxNum:", clickedBoxNum);
  if (playerOne.turn) {
    if (symbol.innerHTML === "O" || symbol.innerHTML === "X") {
      alertModal.showModal();
      alertModal.style.display = "block";
    } else {
      symbol.innerHTML = `${playerOne.symbol}`;
      symbol.style.opacity = "1";
      playerOneClick.play();
      board[clickedBoxNum - 1] = `${playerOne.symbol}`;
      playerOne.turn = false;
      playerTwo.turn = true;
      turnText.innerHTML = `Player Two's Turn (${playerTwo.symbol})`;
    }
  } else if (playerTwo.turn) {
    if (symbol.innerHTML === "X" || symbol.innerHTML === "O") {
      alertModal.showModal();
      alertModal.style.display = "block";
    } else {
      symbol.innerHTML = `${playerTwo.symbol}`;
      symbol.style.opacity = "1";
      playerTwoClick.play();
      board[clickedBoxNum - 1] = `${playerTwo.symbol}`;
      playerTwo.turn = false;
      playerOne.turn = true;
      turnText.innerHTML = `Player One's Turn (${playerOne.symbol})`;
    }
  }

  console.log(board);
  box.style.cursor = "not-allowed";
  // box.style.pointerEvents = "none";
  checkWinner();
};

const changeSymbolNum = () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("mouseenter", (e) => {
      symbolNum = i;
      // console.log(symbolNum);
    });
    boxes[i].addEventListener("click", drawSymbol);
  }
};

changeSymbolNum();

const showWinMessage = (winner) => {
  const message = document.querySelector(".win-message");

  if (winner === null) {
    message.innerText = `No winner! Draw!`;
  } else {
    message.innerText = `${winner} wins!`;
  }
  dialog.showModal();
  dialog.style.display = "block";
};

const restartGame = () => {
  dialog.close();
  dialog.style.display = "none";
  board.fill(null);
  for (let i = 0; i < symbols.length; i++) {
    symbols[i].innerHTML = "";
  }
  boxes.forEach((box) => {
    box.classList.remove("win-combo");
    box.style.cursor = "default";
  });
  if (playerOne.symbol === "X" || playerTwo.symbol === "O") {
    playerOne.symbol = "O";
    playerTwo.symbol = "X";
  } else {
    playerOne.symbol = "X";
    playerTwo.symbol = "O";
  }
  playerOne.turn = true;
  playerTwo.turn = false;
  turnText.innerHTML = `Player One's Turn (${playerOne.symbol})`;
  lineStrike.className = "strike-line";
};

restartBtn.addEventListener("click", restartGame);

const closeAlert = () => {
  alertModal.close();
  alertModal.style.display = "none";
};

confirmBtn.addEventListener("click", closeAlert);

const checkWinner = () => {
  for (const winningCombo of winningCombos) {
    const combo = winningCombo.combo;
    const lineStrikeClass = winningCombo.lineStrikeClass;
    // const { combo, highlightClass } = winningCombo;
    const boxValue1 = board[combo[0] - 1];
    const boxValue2 = board[combo[1] - 1];
    const boxValue3 = board[combo[2] - 1];

    if (
      boxValue1 != null &&
      boxValue1 === boxValue2 &&
      boxValue1 === boxValue3
    ) {
      // boxes[combo[0] - 1].classList.add("win-combo");
      // boxes[combo[1] - 1].classList.add("win-combo");
      // boxes[combo[2] - 1].classList.add("win-combo");
      lineStrike.classList.add(lineStrikeClass);
      if (
        boxValue1 === `${playerOne.symbol}` &&
        boxValue2 === `${playerOne.symbol}` &&
        boxValue3 === `${playerOne.symbol}`
      ) {
        showWinMessage(playerOne.name);
        winnerSound.play();
        playerOne.score++;
        playerOneScore.innerHTML = playerOne.score;
        return;
      } else if (
        boxValue1 === `${playerTwo.symbol}` &&
        boxValue2 === `${playerTwo.symbol}` &&
        boxValue3 === `${playerTwo.symbol}`
      ) {
        showWinMessage(playerTwo.name);
        winnerSound.play();
        playerTwo.score++;
        playerTwoScore.innerHTML = playerTwo.score;
        return;
      }
    }
  }

  const noWinnerBoard = board.every((box) => box !== null);

  if (noWinnerBoard) {
    tieNum++;
    showWinMessage(null);
    tieSound.play();
    tieCounter.innerHTML = tieNum;
  }
};

const fixBoardBorders = () => {
  // eliminate border top
  box1.style.borderTop = "none";
  box2.style.borderTop = "none";
  box3.style.borderTop = "none";

  // eliminate border left
  box1.style.borderLeft = "none";
  box4.style.borderLeft = "none";
  box7.style.borderLeft = "none";

  // eliminate border bottom
  box7.style.borderBottom = "none";
  box8.style.borderBottom = "none";
  box9.style.borderBottom = "none";

  // eliminate border right
  box3.style.borderRight = "none";
  box6.style.borderRight = "none";
  box9.style.borderRight = "none";
};

const toggleDarkMode = () => {
  document.body.classList.remove("light-mode");
  document.body.classList.add("dark-mode");
  boxes.forEach((box) => (box.style.border = "#f8f9fa 5px solid"));
  fixBoardBorders();
  toggleText.innerText = "Dark Mode";
  localStorage.setItem("darkMode", "enabled");
};

const toggleLightMode = () => {
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");
  boxes.forEach((box) => (box.style.border = "#212529 5px solid"));
  fixBoardBorders();
  toggleText.innerText = "Light Mode";
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  toggleDarkMode();
}

toggle.addEventListener("click", function () {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    toggleDarkMode();
  } else {
    toggleLightMode();
  }
});
