
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

function createGameTree(node) {
  var cells = node.getFreeCellsIndexes();
  var opponent = node.getOpponent();
  var board = node.getBoard();
  for (var i = 0; i < cells.length; i++) {
    var nextMoveBoard = board.createNew(cells[i], opponent.getId());
    var child = new GameTree(nextMoveBoard, opponent);
    child.setMove(cells[i]);
    child.setParent(node);
    node.addChild(child);
    createGameTree(child);
  }
}

function calcMiniMax(node, player) {
  var result = node.getBoard().resolveBoardForPlayer(player);
  var results = [];
  for (var i = 0; i < node.getChildren().length; i++) {
    calcMiniMax(node.getChildren()[i], player);
    results.push(node.getChildren()[i].getOutcome());
  }
  if (result != undefined) {
    node.setOutcome(result);
  } else {
    if (node.getPlayerId() != player.getId()) {
      node.setOutcome(Math.max.apply(null, results));
    } else {
      node.setOutcome(Math.min.apply(null, results));
    }
  }
}
module.exports = {
  GameTree: GameTree,
  createGameTree: createGameTree,
  calcMiniMax: calcMiniMax,
};
