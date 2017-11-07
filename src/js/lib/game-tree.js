
function GameTree(board, player) {
  this.board = board;
  this.player = player;
  this.parent = null;
  this.children = [];
  this.cell;
  this.outcome;
}

GameTree.prototype.setParent = function(parent) {
  this.parent = parent;
};

GameTree.prototype.addChild = function(child) {
  this.children.push(child);
};

GameTree.prototype.getParent = function() {
  return this.parent;
};

GameTree.prototype.getChildren = function() {
  return this.children;
};

GameTree.prototype.getFreeCellsIndexes = function() {
  return this.board.getFreeCellsIndexes();
};

GameTree.prototype.getOpponent = function() {
  return this.player.getOpponent();
};

GameTree.prototype.getBoard = function() {
  return this.board;
};

GameTree.prototype.setMove = function(cell) {
  this.cell = cell;
};

GameTree.prototype.getMove = function() {
  return this.cell;
};

GameTree.prototype.setOutcome = function(result) {
  this.outcome = result;
};

GameTree.prototype.getOutcome = function() {
  return this.outcome;
};

GameTree.prototype.getPlayerId = function() {
  return this.player.getId();
};

module.exports = {
  GameTree: GameTree,
};
