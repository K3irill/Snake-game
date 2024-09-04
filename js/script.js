const gameField = document.querySelector(".game__list");
const gameUnits = document.querySelectorAll(".game__unit");
const snakeClass = "snake";
const poisonClass = "poison";

let snake = [76];
let direction = "right";
let food = 0;
let poison1 = 0;
let poison2 = 0;
let interval;

//function for rendering a snake
function renderSnake() {
  gameUnits.forEach((unit) => unit.classList.remove(snakeClass));
  snake.forEach((index) => gameUnits[index].classList.add(snakeClass));
}

//creating foods
function createFood() {
  gameUnits[food].style.backgroundColor = "";
  do {
    food = Math.floor(Math.random() * gameUnits.length);
  } while (snake.includes(food));
  gameUnits[food].style.backgroundColor = "red";
}

//creating poison
function createPoison() {
  gameUnits.forEach((unit) => unit.classList.remove(poisonClass)); // Удалить старую еду

  // Генерация первой еды
  do {
    poison1 = Math.floor(Math.random() * gameUnits.length);
  } while (snake.includes(poison1) || poison1 === poison2); // Убедиться, что еда не появляется на змейке или на месте другого яблока

  // Генерация второй еды
  do {
    poison2 = Math.floor(Math.random() * gameUnits.length);
  } while (snake.includes(poison2) || poison1 === poison2); // Убедиться, что еда не появляется на змейке или на месте первого яблока

  // Отобразить еду
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
    return;
  }

  if (snake.length === 0) {
    clearInterval(interval);
    alert("Игра окончена: Вы отравились");
    return;
  }
  snake.unshift(newHead);

  //   the condition if you ate the food
  if (newHead === food) {
    createFood();
  } else {
    snake.pop();
  }

  //   the condition if you ate the food
  if (newHead === poison1 || newHead === poison2) {
    createPoison();
    snake.pop();
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

function startGame() {
  createPoison();
  createFood();
  interval = setInterval(moveSnake, 300);
}

startGame();
