import { Level } from "./Level.js";
import { Snake } from "./Snake.js";

export class Game {
  constructor() {
    this.levels = new Level(
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
    this.snake = new Snake();
    this.record = localStorage.getItem("snakeRecord") || 0;
    this.food = 0;
    this.poison = [0, 0];
    this.interval = null;
    this.currentLevel = 0;

    this.initElements();
    this.initEvents();
  }

  initElements() {
    this.gameUnits = document.querySelectorAll(".game__unit");
    this.scoreEl = document.querySelector("#score span");
    this.levelEl = document.querySelector("#level span");
    this.recordEl = document.querySelector("#record span");
    this.gameMenu = document.querySelector(".game__menu");
    this.startBtn = document.querySelector(".game__menu_start");
    this.music = document.getElementById("music");
    this.musicBtn = document.getElementById("btn-music");
    this.musicBtnImg = document.querySelector("#btn-music img");
    this.ArrmusicImg = [
      "assets/svg/volume-loud-svgrepo-com.svg",
      "assets/svg/volume-svgrepo-com.svg",
    ];

    this.recordEl.textContent = this.record;
  }

  initEvents() {
    document.addEventListener("keydown", (e) => {
      const keyMap = {
        ArrowRight: "right",
        d: "right",
        ArrowLeft: "left",
        a: "left",
        ArrowUp: "up",
        w: "up",
        ArrowDown: "down",
        s: "down",
      };

      if (keyMap[e.key]) {
        this.snake.changeDirection(keyMap[e.key]);
      }
    });

    this.startBtn.addEventListener("click", () => this.startGame());
    this.musicBtn.addEventListener("click", () => this.toggleMusic());
  }

  createFood() {
    this.gameUnits[this.food].classList.remove("food");
    do {
      this.food = Math.floor(Math.random() * this.gameUnits.length);
    } while (this.snake.snake.includes(this.food));
    this.gameUnits[this.food].classList.add("food");
  }

  createPoison() {
    this.gameUnits.forEach((unit) => unit.classList.remove("poison"));
    do {
      this.poison[0] = Math.floor(Math.random() * this.gameUnits.length);
    } while (this.snake.snake.includes(this.poison[0]));

    do {
      this.poison[1] = Math.floor(Math.random() * this.gameUnits.length);
    } while (
      this.snake.snake.includes(this.poison[1]) ||
      this.poison[0] === this.poison[1]
    );

    this.gameUnits[this.poison[0]].classList.add("poison");
    this.gameUnits[this.poison[1]].classList.add("poison");
  }

  startGame() {
    this.snake.reset();
    this.scoreEl.textContent = this.snake.score;
    this.levelEl.textContent = this.levels.getLevelTitle(0);
    this.createPoison();
    this.createFood();
    this.gameMenu.classList.toggle("hidden");
    this.interval = setInterval(() => this.gameLoop(), 300);
  }

  gameLoop() {
    const moveResult = this.snake.moveSnake(
      this.gameUnits,
      this.poison,
      this.food
    );

    if (moveResult === false) {
      this.fail();
      this.endGame();
      return;
    }

    if (moveResult === "food") {
      this.createFood();
      this.scoreEl.textContent = this.snake.snake.length;
    }

    if (moveResult === "poison") {
      this.createPoison();
      this.scoreEl.textContent = this.snake.snake.length;
    }

    this.updateLevel();
    this.snake.renderSnake(this.gameUnits, "snake");
  }

  updateLevel() {
    let newLevel;
    if (this.snake.snake.length < 10) {
      newLevel = 1;
    } else if (this.snake.snake.length < 20) {
      newLevel = 2;
    } else if (this.snake.snake.length < 30) {
      newLevel = 3;
    } else if (this.snake.snake.length < 40) {
      newLevel = 4;
    } else if (this.snake.snake.length < 60) {
      newLevel = 5;
    } else if (this.snake.snake.length < 80) {
      newLevel = 6;
    } else {
      newLevel = 7;
    }

    if (newLevel !== this.currentLevel) {
      this.currentLevel = newLevel;
      this.levelEl.textContent =
        this.levels._levelTitles[this.currentLevel - 1];
      this.music.src = this.levels.getMusicUrl(this.currentLevel - 1);
      this.music.play();
    }
  }

  endGame() {
    clearInterval(this.interval);
    if (this.snake.snake.length > this.record) {
      this.record = this.snake.snake.length;
      localStorage.setItem("snakeRecord", this.record);
      this.recordEl.textContent = this.record;
      alert("Поздравляем! Вы побили свой рекорд!");
    }
    this.gameMenu.classList.toggle("hidden");
    this.startBtn.textContent = "Restart Game";
  }

  fail() {
    this.music.src = "/assets/music/fail.mp3";
    this.music.play();
    this.music.removeAttribute("loop");
  }

  toggleMusic() {
    if (this.music.muted) {
      this.music.muted = false;
      this.musicBtnImg.src = this.ArrmusicImg[0];
    } else {
      this.music.muted = true;
      this.musicBtnImg.src = this.ArrmusicImg[1];
    }
  }
}
