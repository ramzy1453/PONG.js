import Game from "./Game";
import Menu from "./Game/Menu";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const menu = new Menu();

menu.start();
