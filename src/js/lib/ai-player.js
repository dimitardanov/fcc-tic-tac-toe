
var Player = require('./player.js').Player;
var ai = require('./ai.js');
var mm = require('./minimax.js');

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
    var state = new mm.State(this.board);
    var bestMove = mm.minimax(state, this);
    this.board.fillCell(bestMove, this.getId());
    return bestMove;
  }
};

module.exports = {
  AI: AI
};
