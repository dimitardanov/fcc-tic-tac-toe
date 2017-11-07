
function round1Player0MoveIndex(board, player) {
  var rand = Math.random();
  if (rand < 0.6) {
    return board.playRandomCorner(player.getId());
  } else if (rand < 0.9) {
    return board.playCenter(player.getId());
  } else {
    return board.playRandomEdge(player.getId());
  }
}

function round1Player1MoveIndex(board, player) {
  if (board.isCenterCellFree()) {
    return board.playCenter(player.getId());
  } else {
    return board.playRandomCorner(player.getId());
  }
}

function makeNextMove(board, player) {
  return board.playRandomCell(player.getId());
}

module.exports = {
  round1Player0MoveIndex: round1Player0MoveIndex,
  round1Player1MoveIndex: round1Player1MoveIndex,
  makeNextMove: makeNextMove
};
