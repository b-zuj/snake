import Game from './game';

const ctx = document.getElementById('myCanvas').getContext('2d');

const game = new Game(30, 15, ctx);

document.addEventListener('keydown', e => game.handleKeypress(e), false);

game.gameLoop();
