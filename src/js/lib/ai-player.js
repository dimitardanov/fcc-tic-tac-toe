
var Player = require('./player.js').Player;
var ai = require('./ai.js');

function AI(id, state) {
  Player.call(this, id, state);
}

AI.prototype = Object.create(Player.prototype);

AI.prototype.act = function() {
  if (!this.hasPlayed() && !this.hasOpponentPlayed()) {
    this.setPlayed();
    return ai.round1Player0Action(this);
  } else {
    var optAction = ai.alphaBetaSearch(this.state, this);
    this.state.takeAction(optAction, this.getId());
    return optAction;
  }
};

module.exports = {
  AI: AI
};
