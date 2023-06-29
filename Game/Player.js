import { canvas, ctx } from "../main";

export default class Player {
  constructor({ name, speed = 5, isBot = false }) {
    this.score = 0;
    this.name = name;
    this.speed = speed;
    this.width = canvas.width / 80;
    this.height = canvas.height / 5;
    this.isBot = isBot;
    this.initPosition();
  }

  initPosition() {
    this.y = 0;
    if (!this.isBot) {
      this.x = 0;
    } else {
      this.x = canvas.width - this.width;
    }
  }

  update() {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    this.y -= this.speed * direction;
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > canvas.height - this.height) {
      this.y = canvas.height - this.height;
    }
  }

  collides(ball) {
    return (
      ball.x > this.x &&
      ball.x < this.x + this.width &&
      ball.y > this.y &&
      ball.y < this.y + this.height
    );
  }

  follow(ball) {
    this.y =
      ball.y -
      this.height +
      this.speed * Math.sin((ball.angle * Math.PI) / 180);
  }
}
