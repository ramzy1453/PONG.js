import { canvas, ctx } from "../main";

export default class Ball {
  constructor(speed = 4, radius = 10) {
    this.speed = speed;
    this.initialSpeed = speed;
    this.angle = 45;
    this.radius = radius;
    this.initPosition();
  }

  initPosition() {
    this.x = canvas.width / 3;
    this.y = (Math.random() * canvas.height) / 2 + canvas.height / 4;
  }
  update() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    // Accelerate the ball
    if (this.speed < 10) {
      this.speed += 0.001;
    }
  }

  move(player, bot) {
    this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);

    if (this.y < 0 || this.y > canvas.height) {
      this.angle = -this.angle;
    }

    if (this.collides(player) || this.collides(bot)) {
      this.angle = 180 - this.angle;
    }

    if (this.x < 0) {
      bot.score += 1;
      this.initPosition();
      this.speed = this.initialSpeed;
    }
    if (this.x > canvas.width) {
      player.score += 1;
      this.initPosition();
      this.speed = this.initialSpeed;
    }
  }

  collides(player) {
    return (
      this.x > player.x &&
      this.x < player.x + player.width &&
      this.y > player.y &&
      this.y < player.y + player.height
    );
  }
}
