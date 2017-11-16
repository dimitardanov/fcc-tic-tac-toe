
const render = require('../renderers/render.js');
const State = require('./state.js').State;
const Player = require('./player.js').Player;
const AIPlayer = require('./ai-player.js').AI;

var messages = {
  win: 'Congratulations! You won.',
  draw: 'Good job! It\'s a draw.',
  loss: 'Oops a daisy. You lost.'
};

function Game(boardHTML) {
  this.state;
  this.boardHTML = boardHTML;
  this.player = {wins: 0};
  this.ai = {wins: 0};
  this.humanPlayer;
}

Game.prototype.init = function() {
  this.state = new State();
  var humanPlayer = new Player(1, this.state);
  var aiPlayer = new AIPlayer(10, this.state);
  humanPlayer.setOpponent(aiPlayer);
  aiPlayer.setOpponent(humanPlayer);
  this._setHumanPlayer(humanPlayer);
  this._setAIPlayer(aiPlayer);
  this._setUpGameBoard();
  render.removeDialog(1000);
  render.emptyCells(this.boardHTML, 9);
  if (this.isHumanFirst()) {
    this._showHumanPlayerBoard();
  }
};

Game.prototype._setHumanPlayer = function(player) {
  this.player.actor = player;
};

Game.prototype._setAIPlayer = function(player) {
  this.ai.actor = player;
};

Game.prototype.setPlayerOrder = function(order, elements) {
  if (order == 'first') {
    this.humanPlayer = 'first';
    this.player.html = elements.first;
    this.ai.html = elements.second;
  } else {
    this.humanPlayer = 'second';
    this.ai.html = elements.first;
    this.player.html = elements.second;
  }
};

Game.prototype._updateScore = function(utility) {
  if (utility == 1) {
    this.player.wins++;
    render.updateScore(this.player.html.scoreElement, this.player.wins);
  } else if (utility == -1) {
    this.ai.wins++;
    render.updateScore(this.ai.html.scoreElement, this.ai.wins);
  }
};

Game.prototype._showGameOverDialog = function(utility, bodyHTML) {
  var message;
  if (utility == 1) {
    message = messages.win;
  } else if (utility == 0) {
    message = messages.draw;
  } else if (utility == -1) {
    message = messages.loss;
  }
  return render.dialog(bodyHTML, 'gameOver', {message: message});
};

Game.prototype.isGameOver = function() {
  var utility = this.state.utilityFor(this.player.actor);
  return ([-1, 1].includes(utility) || !this.state.hasActionsLeft());
};

Game.prototype.runGameOverSequence = function(bodyHTML) {
  var utility = this.state.utilityFor(this.player.actor);
  this._updateScore(utility);
  this._showGameOverBoard();
  return this._showGameOverDialog(utility, bodyHTML);;
};

Game.prototype.isHumanFirst = function() {
  return this.humanPlayer == 'first';
};

Game.prototype._setUpGameBoard = function() {
  this._hideHumanPlayerBoard();
  this._hideAIPlayerBoard();
  var self = this;
  setTimeout(() => {
    render.setBoardText(this.player.html.board, 'Your turn');
    render.setBoardText(this.ai.html.board, 'AI\'s turn');
  }, 300);
};

Game.prototype._showGameOverBoard = function() {
  render.setBoardText(this.player.html.board, 'You');
  render.setBoardText(this.ai.html.board, 'Computer');
  render.showPlayerBoard(this.player.html.board);
  render.showPlayerBoard(this.ai.html.board);
};

Game.prototype.playerTakeATurn = function(cellHTML) {
  var action = cellHTML.getAttribute('id');
  this.player.actor.act(action);
  this.player.html.symbolFunc(cellHTML);
  render.deactivateCell(cellHTML);
  this._hideHumanPlayerBoard();
  return cellHTML;
};

Game.prototype.aiTakeATurn = function() {
  this._showAIPlayerBoard();
  var action = this.ai.actor.act();
  var cellHTML;
  setTimeout(() => {
    cellHTML = document.getElementById(action);
    this.ai.html.symbolFunc(cellHTML);
    render.deactivateCell(cellHTML);
    setTimeout(() => {
      this._hideAIPlayerBoard();
      this._showHumanPlayerBoard();
    }, 400);
  }, 500);
  return cellHTML;
};

Game.prototype._showHumanPlayerBoard = function() {
  render.showPlayerBoard(this.player.html.board);
};

Game.prototype._hideHumanPlayerBoard = function() {
  render.hidePlayerBoard(this.player.html.board);
};

Game.prototype._showAIPlayerBoard = function() {
  render.showPlayerBoard(this.ai.html.board);
};

Game.prototype._hideAIPlayerBoard = function() {
  render.hidePlayerBoard(this.ai.html.board);
};

module.exports = {
  Game: Game
};
