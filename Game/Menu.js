import { ctx, canvas } from "../main";
import Game from "./";
import { keys } from "./events";

export default class Menu {
  constructor() {}

  start() {
    this.drawMenu();
    this.keysHandler();
    requestAnimationFrame(this.update.bind(this));
  }
  update() {
    if (keys["1"]) {
      this.game = new Game({ vsBot: true });
      this.game.start();
    }
    if (keys["2"]) {
      this.game = new Game({ vsBot: false });
      this.game.start();
    }
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

  drawMenu() {
    // draw the menu with game name then 1vsBot and 2vs2
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "60px Arial";
    ctx.fillText("PONG", canvas.width / 2 - 30, canvas.height / 2 - 30);
    ctx.font = "20px Arial";
    ctx.fillText(
      "Click 1 for 1 vs Bot",
      canvas.width / 2 - 30,
      canvas.height / 2
    );
    ctx.fillText(
      "Click 2 for 1 vs 1",
      canvas.width / 2 - 30,
      canvas.height / 2 + 30
    );
  }
}
