const gameField = document.querySelector(".game__list");
const gameUnits = document.querySelectorAll(".game__unit");
const scoreEl = document.querySelector("#score span");
const levelEl = document.querySelector("#level span");
const gameMenu = document.querySelector(".game__menu");
const startBtn = document.querySelector(".game__menu_start");
const snakeClass = "snake";
const poisonClass = "poison";
const foodClass = "food";

const levels = [
  "beginner",
  "favorite",
  "fighter",
  "warrior",
  "hero",
  "legend",
  "Lord",
];

let snake = [76];
let direction = "right";
let food = 0;
let poison1 = 0;
let poison2 = 0;
let interval;
let score = snake.length;

//function for rendering a snake
function renderSnake() {
  gameUnits.forEach((unit) => unit.classList.remove(snakeClass));
  snake.forEach((index) => gameUnits[index].classList.add(snakeClass));
}

//creating foods
function createFood() {
  gameUnits[food].classList.remove(foodClass);
  do {
    food = Math.floor(Math.random() * gameUnits.length);
  } while (snake.includes(food));
  gameUnits[food].classList.add(foodClass);
}

//creating poison
function createPoison() {
  gameUnits.forEach((unit) => unit.classList.remove(poisonClass));
  do {
    poison1 = Math.floor(Math.random() * gameUnits.length);
  } while (snake.includes(poison1) || poison1 === poison2);

  do {
    poison2 = Math.floor(Math.random() * gameUnits.length);
  } while (snake.includes(poison2) || poison1 === poison2);

  gameUnits[poison1].classList.add(poisonClass);
  gameUnits[poison2].classList.add(poisonClass);
}

//logic function for moving the snake
function moveSnake() {
  let head = snake[0];
  let newHead;

  if (direction === "right") newHead = head + 1;
  if (direction === "left") newHead = head - 1;
  if (direction === "up") newHead = head - 17;
  if (direction === "down") newHead = head + 17;

  //Passage through walls
  if (newHead < 0) newHead = gameUnits.length + newHead;
  if (newHead >= gameUnits.length) newHead = newHead - gameUnits.length;
  if (newHead % 17 === 0 && direction === "right") newHead -= 17;
  if (head % 17 === 0 && direction === "left") newHead += 17;

  if (snake.includes(newHead)) {
    clearInterval(interval);
    alert("Игра окончена: Вы врезались в себя!");
    gameMenu.classList.toggle("hidden");
    return;
  }

  if (snake.length === 0) {
    clearInterval(interval);
    alert("Игра окончена: Вы отравились");
    gameMenu.classList.toggle("hidden");
    return;
  }
  snake.unshift(newHead);
  //   the condition if you ate the food
  if (newHead === food) {
    createFood();
    scoreEl.textContent = snake.length;
  } else {
    snake.pop();
  }
  //   the condition if you ate the poison
  if (newHead === poison1 || newHead === poison2) {
    createPoison();
    snake.pop();
    scoreEl.textContent = snake.length;
  }

  if (snake.length < 10) {
    levelEl.textContent = levels[0];
  } else if (snake.length < 20) {
    levelEl.textContent = levels[1];
  } else if (snake.length < 30) {
    levelEl.textContent = levels[2];
  } else if (snake.length < 40) {
    levelEl.textContent = levels[3];
  } else if (snake.length < 60) {
    levelEl.textContent = levels[4];
  } else if (snake.length < 80) {
    levelEl.textContent = levels[5];
  } else if (snake.length < 100) {
    levelEl.textContent = levels[6];
  }

  renderSnake();
}

document.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowRight" || e.key === "d") && direction !== "left")
    direction = "right";
  if ((e.key === "ArrowLeft" || e.key === "a") && direction !== "right")
    direction = "left";
  if ((e.key === "ArrowUp" || e.key === "w") && direction !== "down")
    direction = "up";
  if ((e.key === "ArrowDown" || e.key === "s") && direction !== "up")
    direction = "down";
});

function resetGame() {
  snake = [76];
  direction = "right";
  scoreEl.textContent = snake.length;
  clearInterval(interval);
}

function startGame() {
  resetGame();
  gameMenu.classList.toggle("hidden");

  createPoison();
  createFood();
  interval = setInterval(moveSnake, 300);
}

startBtn.addEventListener("click", startGame);
