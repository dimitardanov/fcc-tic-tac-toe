
var Player = require('./player.js').Player;

function AI(id, board) {
  Player.call(this, id, board);
}

AI.prototype = Object.create(Player.prototype);

AI.prototype.takeTurn = function() {
  var turns = this.board.getFreeCellsIndexes();
  var index = Math.floor(Math.random() * turns.length);
  var cell = turns[index];
  Player.prototype.takeTurn.call(this, cell);
  return cell;
};

module.exports = {
  AI: AI
};
