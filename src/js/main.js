
const render = require('./renderers/render.js');
const Game = require('./lib/game.js').Game;

const boardHTML = document.getElementById('board');
const bodyHTML = document.querySelector('body');

var playerOrderHTML = {
  first: {
    scoreElement: document.querySelector('#player-first-score'),
    board: document.querySelector('.player-first'),
    symbolFunc: render.cross,
    first: true
  },
  second: {
    scoreElement: document.querySelector('#player-second-score'),
    board: document.querySelector('.player-second'),
    symbolFunc: render.circle,
    first: false
  }
};
var game = new Game(boardHTML);

function getGamePreferences() {
  var dialogHTML = render.dialog(bodyHTML, 'prefs', {});
  dialogHTML.addEventListener('click', dialogPrefEventHandler);

  function dialogPrefEventHandler(event) {
    if (event.target.nodeName.toLowerCase() == 'button') {
      dialogHTML.removeEventListener('click', dialogPrefEventHandler);
      game.setPlayerOrder(
        event.target.getAttribute('data-player'),
        playerOrderHTML
      );
      play(game);
    }
  }
}

function play(game) {
  game.init();
  if (game.isHumanFirst()) {
    boardHTML.addEventListener('click', makeMove);
  } else {
    takeAITurn();
  }

  function endGame() {
    setTimeout(function() {
      var dialogHTML = game.runGameOverSequence(bodyHTML);
      dialogHTML.addEventListener('click', endGameHandler);

      function endGameHandler(event) {
        if (event.target.nodeName.toLowerCase() == 'button') {
          dialogHTML.removeEventListener('click', endGameHandler);
          play(game);
        }
      }
    }, 1000);
  }

  function makeMove(e) {
    if (render.isCellFree(e.target)) {
      game.playerTakeATurn(e.target);
      boardHTML.removeEventListener('click', makeMove);
      if (!game.isGameOver()) {
        takeAITurn();
      } else {
        endGame();
      }
    }
  }

  function takeAITurn() {
    game.aiTakeATurn();
    if (game.isGameOver()) {
      endGame();
    } else {
      setTimeout(function() {
        boardHTML.addEventListener('click', makeMove);
      }, 900);
    }
  }
}

getGamePreferences();
