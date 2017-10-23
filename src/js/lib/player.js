
function Player(id, board) {
  this.id = id;
  this.board = board;
}

Player.prototype.takeTurn = function(cell) {
  this.board.fillCell(cell, this.id);
  console.log(this.board);
};

module.exports = {
  Player: Player
};
