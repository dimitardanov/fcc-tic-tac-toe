
function round1Player0MoveIndex(state, player) {
  var rand = Math.random();
  if (rand < 0.6) {
    return state.actRandomCorner(player.getId());
  } else if (rand < 0.9) {
    return state.actCenter(player.getId());
  } else {
    return state.actRandomEdge(player.getId());
  }
}

function round1Player1MoveIndex(state, player) {
  if (state.isActionCenterFree()) {
    return state.actCenter(player.getId());
  } else {
    return state.actRandomCorner(player.getId());
  }
}

module.exports = {
  round1Player0MoveIndex: round1Player0MoveIndex,
  round1Player1MoveIndex: round1Player1MoveIndex
};
