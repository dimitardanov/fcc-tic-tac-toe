
function Player(id, state) {
  this.id = id;
  this.state = state;
  this.playedFirstMove = false;
}

Player.prototype.takeTurn = function(cell) {
  this.playedFirstMove = true;
  this.state.takeAction(cell, this.id);
};

Player.prototype.setOpponent = function(player) {
  this.opponent = player;
};

Player.prototype.getOpponent = function() {
  return this.opponent;
};

Player.prototype.hasPlayed = function() {
  return this.playedFirstMove;
};

Player.prototype.hasOpponentPlayed = function() {
  return this.getOpponent().hasPlayed();
};

Player.prototype.setPlayed = function() {
  this.playedFirstMove = true;
};

Player.prototype.getId = function() {
  return this.id;
};

Player.prototype.getOpponentId = function() {
  return this.getOpponent().getId();
};

module.exports = {
  Player: Player
};
