const gameField = document.querySelector(".game_field");
const gameUnits = document.querySelectorAll(".game__unit");
const snakeClass = "snake";

let snake = [76];
let direction = "right";
let food = 0;
let interval;

