import Game from './game';

const context = document.getElementById('myCanvas').getContext('2d');

const game = new Game(30, 15, context);

document.addEventListener('keydown', event => game.handleKeypress(event), false);

game.gameLoop();
