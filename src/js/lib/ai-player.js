
var Player = require('./player.js').Player;
var ai = require('./ai.js');
var minimax = require('./minimax.js').minimax;

function AI(id, state) {
  Player.call(this, id, state);
}

AI.prototype = Object.create(Player.prototype);

AI.prototype.takeTurn = function() {
  if (!this.hasPlayed() && !this.hasOpponentPlayed()) {
    this.setPlayed();
    return ai.round1Player0MoveIndex(this);
  } else if (!this.hasPlayed()) {
    this.setPlayed();
    return ai.round1Player1MoveIndex(this.state, this);
  } else {
    var bestMove = minimax(this.state, this);
    this.state.takeAction(bestMove, this.getId());
    return bestMove;
  }
};

module.exports = {
  AI: AI
};
