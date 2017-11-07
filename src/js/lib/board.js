
const helpers = require('../helpers/helpers.js');

function Board() {
  this.board = [];
  for (var i = 0; i < 9; i++) {
    this.board[i] = undefined;
  }
}

Board.prototype.getFreeCellsIndexes = function() {
  var acc = [];
  for (var i = 0; i < this.board.length; i++) {
    if (this.board[i] === undefined) {
      acc.push(i);
    }
  }
  return acc;
};

Board.prototype.fillCell = function(cell, player) {
  if (this.board[cell] !== undefined) {
    throw new Error('Non empty board cell.');
  } else if (cell < 0 || cell >= this.board.length) {
    throw new Error('Cell not on the board.');
  } else {
    this.board[cell] = player;
  }
};

Board.prototype.hasMovesLeft = function() {
  for (var i = 0; i < 9; i++) {
    if (this.board[i] == undefined) {
      return true;
    }
  }
  return false;
};

Board.prototype.isCenterCellFree = function() {
  return this.board[4] == undefined;
};

Board.prototype.playCenter = function(player) {
  if (this.isCenterCellFree()) {
    this.board[4] = player;
    return 4;
  } else {
    throw new Error('Non empty board cell.');
  }
};

Board.prototype.selectRandomFrom = function(player, boardInd, msg) {
  for (var i = 0; i < 4; i++) {
    var randIndex = Math.floor(boardInd.length * Math.random());
    var cellIndex = boardInd[randIndex];
    boardInd.splice(randIndex, 1);
    if (this.board[cellIndex] == undefined) {
      this.board[cellIndex] = player;
      return cellIndex;
    }
  }
  throw new Error(msg);
};

Board.prototype.playRandomCorner = function(player) {
  var boardCorners = [0, 2, 6, 8];
  var msg = 'Cannot play corner cell';
  return this.selectRandomFrom(player, boardCorners, msg);
};

Board.prototype.playRandomEdge = function(player) {
  var boardSides = [1, 3, 5, 7];
  var msg = 'Cannot play side cell';
  return this.selectRandomFrom(player, boardSides, msg);
};

Board.prototype.playRandomCell = function(player) {
  var freeCells = this.getFreeCellsIndexes();
  var msg = 'Cannot play a random cell';
  return this.selectRandomFrom(player, freeCells, msg);
};

Board.prototype.resolveBoardForPlayer = function(player) {
  return helpers.resolveBoard(
    this.board, player.getId(), player.getOpponentId());
};

Board.prototype.createNew = function(cell, player) {
  var newBoard = this.duplicateBoard();
  newBoard.fillCell(cell, player);
  return newBoard;
};

Board.prototype.duplicateBoard = function() {
  var newBoard = new Board();
  for (var i = 0; i < this.board.length; i++) {
    if (this.board[i]) {
      newBoard.fillCell(i, this.board[i]);
    }
  }
  if (!this.isEquivalentTo(newBoard)) {
    throw new Error('boards different');
  }
  return newBoard;
};

Board.prototype.isEquivalentTo = function(board2) {
  return this.board.every(function(el, i) {
    return el == board2.board[i];
  });
};

module.exports = {
  Board: Board
};
