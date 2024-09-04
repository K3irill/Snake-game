const gameField = document.querySelector(".game__list");
const gameUnits = document.querySelectorAll(".game__unit");
const scoreEl = document.querySelector("#score span");
const levelEl = document.querySelector("#level span");
const gameMenu = document.querySelector(".game__menu");
const startBtn = document.querySelector(".game__menu_start");
const music = document.getElementById("music");
const musicBtn = document.getElementById("btn-music");
const musicBtnImg = document.querySelector("#btn-music img");
const ArrmusicImg = [
  "assets/svg/volume-loud-svgrepo-com.svg",
  "assets/svg/volume-svgrepo-com.svg",
];
console.log(musicBtnImg);

const snakeClass = "snake";
const poisonClass = "poison";
const foodClass = "food";

class classLevel {
  constructor(levelTitle, musicUrl) {
    (this._levelTitle = levelTitle), (this._musicUrl = musicUrl);
  }
  get levelTitle() {
    return this._levelTitle;
  }
  get musicUrl() {
    return this._musicUrl;
  }
}

const levels = new classLevel(
  ["beginner", "favorite", "fighter", "warrior", "hero", "legend", "Lord"],
  [
    "/assets/music/level-1.mp3",
    "/assets/music/level-2.mp3",
    "/assets/music/level-3.mp3",
    "/assets/music/level-4.mp3",
    "/assets/music/level-5.mp3",
    "/assets/music/level-final.mp3",
  ]
);
console.log(levels._musicUrl[0]);

let snake = [76];
let direction = "right";
let food = 0;
let poison1 = 0;
let poison2 = 0;
let interval;
let score = snake.length;
let currentLevel = 0;

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
    fail();
    clearInterval(interval);
    // alert("Игра окончена: Вы врезались в себя!");
    gameMenu.classList.toggle("hidden");

    return;
  }

  if (snake.length === 0) {
    fail();
    clearInterval(interval);
    // alert("Игра окончена: Вы отравились");
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

  let newLevel;
  if (snake.length < 10) {
    newLevel = 1;
  } else if (snake.length < 20) {
    newLevel = 2;
  } else if (snake.length < 30) {
    newLevel = 3;
  } else if (snake.length < 40) {
    newLevel = 4;
  } else if (snake.length < 60) {
    newLevel = 5;
  } else if (snake.length < 80) {
    newLevel = 6;
  } else if (snake.length < 100) {
    newLevel = 7;
  }

  if (newLevel !== currentLevel) {
    currentLevel = newLevel;
    levelEl.textContent = levels._levelTitle[currentLevel - 1];
    music.src = levels._musicUrl[currentLevel - 1];
    music.play();
  } else {
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
  currentLevel = 0;
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
musicBtn.addEventListener("click", () =>
  music.muted != true
    ? ((music.muted = true), (musicBtnImg.src = ArrmusicImg[1]))
    : ((music.muted = false), (musicBtnImg.src = ArrmusicImg[0]))
);

function fail() {
  music.src = "/assets/music/fail.mp3";
  music.play();
  music.removeAttribute("loop");
}
