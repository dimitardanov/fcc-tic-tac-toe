
// window.jQuery = $ = require('jquery');
// var bootstrap = require('bootstrap-sass');

const render = require('./renderers/render.js');
const State = require('./lib/state.js').State;
const Player = require('./lib/player.js').Player;
const AIPlayer = require('./lib/ai-player.js').AI;

const boardHTML = document.getElementById('board');

render.emptyCells(boardHTML, 9);

var state = new State();
var humanPlayer = new Player(1, state);
var aiPlayer = new AIPlayer(10, state);
humanPlayer.setOpponent(aiPlayer);
aiPlayer.setOpponent(humanPlayer);

boardHTML.addEventListener('click', makeMove);

function makeMove(e) {
  if (e.target.classList.contains('cell') &&
      e.target.classList.contains('free')) {
    e.target.classList.remove('free');
    render.cross(e.target);
    boardHTML.removeEventListener('click', makeMove);
    var cell = event.target.getAttribute('id');
    humanPlayer.act(cell);
    takeAITurn();
  }
}

function takeAITurn() {
  if (state.hasActionsLeft()) {
    var cell = aiPlayer.act();
    var cellHTML = document.getElementById(cell);
    cellHTML.classList.remove('free');
    render.circle(cellHTML);
    setTimeout(function() {
      boardHTML.addEventListener('click', makeMove);
    }, 900);
  }
}
