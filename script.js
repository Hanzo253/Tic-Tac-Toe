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
  { combo: [1, 2, 3], highlightClass: "row-1" },
  { combo: [4, 5, 6], highlightClass: "row-2" },
  { combo: [7, 8, 9], highlightClass: "row-3" },
  // columns
  { combo: [1, 4, 7], highlightClass: "column-1" },
  { combo: [2, 5, 8], highlightClass: "column-2" },
  { combo: [3, 6, 9], highlightClass: "column-3" },
  // diagonals
  { combo: [1, 5, 9], highlightClass: "diagonal-1" },
  { combo: [3, 5, 7], highlightClass: "diagonal-2" },
];

const dialog = document.querySelector(".winner");
// dialog.returnValue = "The Winner!";

const restartBtn = document.querySelector(".restart");

const turnText = document.querySelector(".turn");

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

  // dialog.showModal();
  // dialog.style.display = "block";
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

const restartGame = () => {
  dialog.close();
  dialog.style.display = "none";
};

restartBtn.addEventListener("click", restartGame);

for (let i = 0; i < boxes.length; i++) {
  console.log(boxes[i].dataset.indexNumber);
}

const checkWinner = () => {
  for (const winningCombo of winningCombos) {
    const combo = winningCombo.combo;
    const highlightClass = winningCombo.highlightClass;
    // const { combo, highlightClass } = winningCombo;
    const boxValue1 = board[combo[0] - 1];
    const boxValue2 = board[combo[1] - 1];
    const boxValue3 = board[combo[2] - 1];

    if (
      boxValue1 != null &&
      boxValue1 === boxValue2 &&
      boxValue1 === boxValue3
    ) {
      boxes[combo[0] - 1].classList.add(highlightClass);
      boxes[combo[1] - 1].classList.add(highlightClass);
      boxes[combo[2] - 1].classList.add(highlightClass);
      console.log(combo);
      console.log(boxes);
    }
  }
};
