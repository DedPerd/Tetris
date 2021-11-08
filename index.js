import Game from './src/game.js'
import View from './src/view.js'
import Controller from "./src/controller.js";

const columns = 10
const rows = 20;
const width = 450;
const height = 600;
const element = document.querySelector('#canvas')

const game = new Game(columns, rows);
const view = new View(element, width, height, columns, rows);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;