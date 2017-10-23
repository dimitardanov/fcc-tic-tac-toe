
function Board() {
  this.board = Array(9);
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

module.exports = {
  Board: Board
};
