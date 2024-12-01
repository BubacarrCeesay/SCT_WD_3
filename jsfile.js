let playerturn = document.getElementById("playerturn");
let resetBtn = document.getElementById("resetbtn");
let container = document.querySelector(".container");

let boxes = Array.from(document.querySelectorAll(".box"));

let X_text = "X";
let O_text = "O";
let spaces = Array(9).fill(null);

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = X_text;

function startGame() {
  boxes.forEach((box) => box.addEventListener("click", boxFun));
}

function boxFun(e) {
  let id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;

    e.target.innerHTML = currentPlayer;

    if (playerHasWon() !== false) {
      playerturn.innerHTML = `Player ${currentPlayer} Has Won!`;
      showWinAnim();
      boxes.forEach((bxs) => bxs.removeEventListener("click", boxFun));
    } else if (!spaces.includes(null)) {
      playerturn.innerHTML = `Its A Draw!`;
      boxes.forEach((bxs) => bxs.removeEventListener("click", boxFun));
    } else {
      currentPlayer = currentPlayer == X_text ? O_text : X_text;

      playerturn.innerHTML = `Player ${currentPlayer}'s Turn`;
    }
  }
}

resetBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  currentPlayer = X_text;
  container.classList.remove("win");
  startGame();
  playerturn.innerHTML = `Player ${X_text}'s Turn`;
  boxes.forEach((bx) => {
    bx.innerHTML = "";
  });
}

function playerHasWon() {
  for (const cnd of winningCombos) {
    let [a, b, c] = cnd;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[c] == spaces[a]) {
      container.classList.add("win");
      return true;
    }
  }

  return false;
}

startGame();

function showWinAnim() {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });
}
