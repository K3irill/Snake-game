export class Snake {
  constructor() {
    this.snake = [76];
    this.direction = "right";
    this.score = this.snake.length;
  }

  reset() {
    this.snake = [76];
    this.direction = "right";
    this.score = this.snake.length;
  }

  moveSnake(gameUnits, poison, food) {
    let head = this.snake[0];
    let newHead;

    switch (this.direction) {
      case "right":
        newHead = head + 1;
        break;
      case "left":
        newHead = head - 1;
        break;
      case "up":
        newHead = head - 17;
        break;
      case "down":
        newHead = head + 17;
        break;
    }

    // if (newHead < 0) newHead = gameUnits.length + newHead;
    // if (newHead >= gameUnits.length) newHead = newHead - gameUnits.length;
    // if (newHead % 17 === 0 && this.direction === "right") newHead -= 17;
    // if (head % 17 === 0 && this.direction === "left") newHead += 17;

    if (
      (this.direction === "right" && head % 17 === 16) ||
      (this.direction === "left" && head % 17 === 0) ||
      (this.direction === "up" && newHead < 0) ||
      (this.direction === "down" && newHead >= 289)
    ) {
      return false;
    }

    if (this.snake.includes(newHead) || this.snake.length == 0) {
      return false;
    }

    this.snake.unshift(newHead);

    if (newHead === food) {
      return "food";
    } else {
      this.snake.pop();
    }

    if (newHead === poison[0] || newHead === poison[1]) {
      this.snake.pop();
      return "poison";
    }

    return true;
  }

  renderSnake(gameUnits, snakeClass) {
    gameUnits.forEach((unit) => unit.classList.remove(snakeClass));
    this.snake.forEach((index) => gameUnits[index].classList.add(snakeClass));
  }

  changeDirection(newDirection) {
    if (
      (newDirection === "right" && this.direction !== "left") ||
      (newDirection === "left" && this.direction !== "right") ||
      (newDirection === "up" && this.direction !== "down") ||
      (newDirection === "down" && this.direction !== "up")
    ) {
      this.direction = newDirection;
    }
  }
}
