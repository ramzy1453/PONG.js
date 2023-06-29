import { canvas, ctx } from "../main";
import Ball from "./Ball";
import Player from "./Player";
import { keys } from "./events";

export default class Game {
  constructor({ vsBot = true }) {
    this.vsBot = vsBot;
    this.time = 0;
    this.remainingTime = 60;
    this.player = new Player({ name: "Player", isBot: false });
    this.bot = new Player({ name: "Bot", isBot: true });
    this.ball = new Ball();
    this.scoreForVictory = 6;
  }

  start() {
    console.log("Game started");
    this.keysHandler();
    requestAnimationFrame(this.update.bind(this));
  }

  update() {
    // calculate the time
    this.time += 1 / 60;

    // draw the background
    this.drawBackground();

    // Move the player
    this.movePlayer();
    if (this.vsBot) {
      this.bot.follow(this.ball);
    }
    this.ball.move(this.player, this.bot);

    // Update the game objects
    this.player.update();
    this.bot.update();
    this.ball.update();

    // verify if the game ended
    this.verifyEnd();

    // Update the game state
    requestAnimationFrame(this.update.bind(this));
  }

  keysHandler() {
    document.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });
    document.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });
  }

  movePlayer() {
    if (keys.ArrowUp) {
      this.player.move(1);
    }
    if (keys.ArrowDown) {
      this.player.move(-1);
    }
    if (keys.Escape) {
      this.exit();
    }
    if (!this.vsBot) {
      if (keys.w) {
        this.bot.move(1);
      }
      if (keys.s) {
        this.bot.move(-1);
      }
    }
  }

  drawBackground() {
    // Draw the background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the score board
    ctx.font = "50px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(this.player.score, canvas.width / 2 - 50, 50);
    ctx.fillStyle = "red";
    ctx.fillText(this.bot.score, canvas.width / 2 + 20, 50);

    // draw the middle line dashed
    ctx.beginPath();
    ctx.setLineDash([20, 10]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  exit() {
    window.location.reload();
  }

  verifyEnd() {
    if (this.vsBot) {
      if (this.player.score === this.scoreForVictory) {
        alert("You win");
        this.exit();
      }
      if (this.bot.score === this.scoreForVictory) {
        alert("You lose");
        this.exit();
      }
    } else {
      if (this.player.score === this.scoreForVictory) {
        alert("Player 1 wins");
        this.exit();
      }
      if (this.bot.score === this.scoreForVictory) {
        alert("Player 2 wins");
        this.exit();
      }
    }
  }
}
