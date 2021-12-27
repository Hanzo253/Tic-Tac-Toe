let playerOne = {
  name: "Player One",
  turn: true,
  score: 0,
};

let playerTwo = {
  name: "Player Two",
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

const dialog = document.querySelector(".winner");
// dialog.returnValue = "The Winner!";

const restartBtn = document.querySelector(".restart");

let symbolNum = 0;
let XorO = true;

const drawSymbol = () => {
  const symbol = document.querySelector(`.symbol-${symbolNum + 1}`);
  const box = document.querySelector(`.box-${symbolNum + 1}`);
  if (XorO) {
    if (symbol.innerHTML === "O") {
      alert("Spot Taken");
    } else {
      symbol.innerHTML = `X`;
      XorO = false;
    }
  } else {
    if (symbol.innerHTML === "X") {
      alert("Spot Taken");
    } else {
      symbol.innerHTML = `O`;
      XorO = true;
    }
  }

  // dialog.showModal();
  // dialog.style.display = "block";
  box.style.cursor = "not-allowed";
  // box.style.pointerEvents = "none";
};

const changeXorO = () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("mouseenter", (e) => {
      symbolNum = i;
      console.log(symbolNum);
    });
    boxes[i].addEventListener("click", drawSymbol);
  }
};

changeXorO();

const restartGame = () => {
  dialog.close();
  dialog.style.display = "none";
};

restartBtn.addEventListener("click", restartGame);
