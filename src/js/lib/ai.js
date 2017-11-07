
function makeNextMove(board, player) {
  return board.playRandomCell(player.getId());
}

module.exports = {
  makeNextMove: makeNextMove
};
