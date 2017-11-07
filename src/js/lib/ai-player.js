
var Player = require('./player.js').Player;
var ai = require('./ai.js');
var gt = require('./game-tree.js');

function AI(id, board) {
  Player.call(this, id, board);
}

AI.prototype = Object.create(Player.prototype);

AI.prototype.takeTurn = function() {
  if (!this.hasPlayed() && !this.hasOpponentPlayed()) {
    this.setPlayed();
    return ai.round1Player0MoveIndex(this);
  } else if (!this.hasPlayed()) {
    this.setPlayed();
    return ai.round1Player1MoveIndex(this.board, this);
  } else {
    var gameTree = new gt.GameTree(
      this.board.duplicateBoard(), this.getOpponent());
    gt.createGameTree(gameTree);
    gt.calcMiniMax(gameTree, this);
    var bestMove = gt.bestMove(gameTree);
    this.board.fillCell(bestMove, this.getId());
    return bestMove;
  }
};

module.exports = {
  AI: AI
};
