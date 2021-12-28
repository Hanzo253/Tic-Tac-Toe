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

const boxes = document.querySelectorAll(".box");
const symbols = document.querySelectorAll(".symbol");
const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const box5 = document.querySelector(".box-5");
const box6 = document.querySelector(".box-6");
const box7 = document.querySelector(".box-7");
const box8 = document.querySelector(".box-8");
const box9 = document.querySelector(".box-9");

const board = Array(boxes.length);
board.fill(null);

const winningCombos = [
  // rows
  { combo: [1, 2, 3] },
  { combo: [4, 5, 6] },
  { combo: [7, 8, 9] },
  // columns
  { combo: [1, 4, 7] },
  { combo: [2, 5, 8] },
  { combo: [3, 6, 9] },
  // diagonals
  { combo: [1, 5, 9] },
  { combo: [3, 5, 7] },
];

const dialog = document.querySelector(".winner");
// dialog.returnValue = "The Winner!";

const restartBtn = document.querySelector(".restart");

const turnText = document.querySelector(".turn");

const playerOneScore = document.querySelector("#one-score");
const playerTwoScore = document.querySelector("#two-score");
const tieCounter = document.querySelector("#tie-score");
let tieNum = 0;

let symbolNum = 0;
let XorO = true;

const drawSymbol = (event) => {
  const symbol = document.querySelector(`.symbol-${symbolNum + 1}`);
  const box = document.querySelector(`.box-${symbolNum + 1}`);
  const clickedBox = event.target;
  const clickedBoxNum = clickedBox.dataset.indexNumber;
  console.log("clickedBoxNum:", clickedBoxNum);
  if (XorO) {
    if (symbol.innerHTML === "O" || symbol.innerHTML === "X") {
      alert("This box is not empty, please choose another one.");
    } else {
      symbol.innerHTML = `X`;
      board[clickedBoxNum - 1] = "X";
      XorO = false;
      turnText.innerHTML = `Player Two's Turn (O)`;
    }
  } else {
    if (symbol.innerHTML === "X" || symbol.innerHTML === "O") {
      alert("This box is not empty, please choose another one.");
    } else {
      symbol.innerHTML = `O`;
      board[clickedBoxNum - 1] = "O";
      XorO = true;
      turnText.innerHTML = `Player One's Turn (X)`;
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
      console.log(symbolNum);
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
  boxes.forEach((box) => box.classList.remove("win-combo"));
};

restartBtn.addEventListener("click", restartGame);

for (let i = 0; i < boxes.length; i++) {
  console.log(boxes[i].dataset.indexNumber);
}

const checkWinner = () => {
  for (const winningCombo of winningCombos) {
    const combo = winningCombo.combo;
    // const { combo, highlightClass } = winningCombo;
    const boxValue1 = board[combo[0] - 1];
    const boxValue2 = board[combo[1] - 1];
    const boxValue3 = board[combo[2] - 1];

    if (
      boxValue1 != null &&
      boxValue1 === boxValue2 &&
      boxValue1 === boxValue3
    ) {
      boxes[combo[0] - 1].classList.add("win-combo");
      boxes[combo[1] - 1].classList.add("win-combo");
      boxes[combo[2] - 1].classList.add("win-combo");
      if (boxValue1 === "X" && boxValue2 === "X" && boxValue3 === "X") {
        showWinMessage(playerOne.name);
        playerOne.score++;
        playerOneScore.innerHTML = playerOne.score;
        return;
      } else if (boxValue1 === "O" && boxValue2 === "O" && boxValue3 === "O") {
        showWinMessage(playerTwo.name);
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
    tieCounter.innerHTML = tieNum;
  }
};
