
function minimax(state, player) {
  var optAction;
  var v = -Infinity;
  var actions = state.getActions();
  for (var i = 0; i < actions.length; i++) {
    var newState = state.createNew(actions[i], player);
    var maxV = Math.max(v, _minVal(newState, player));
    if (v < maxV) {
      v = maxV;
      optAction = actions[i];
    }
  }
  return optAction;
}

function _maxVal(state, player) {
  if (state.isTerminal(player)) {
    return state.utilityFor(player);
  } else {
    var v = -Infinity;
    var actions = state.getActions();
    for (var i = 0; i < actions.length; i++) {
      var newState = state.createNew(actions[i], player);
      v = Math.max(v, _minVal(newState, player));
    }
    return v;
  }
}

function _minVal(state, player) {
  if (state.isTerminal(player)) {
    return state.utilityFor(player);
  } else {
    var v = Infinity;
    var actions = state.getActions();
    for (var i = 0; i < actions.length; i++) {
      var newState = state.createNew(actions[i], player.getOpponent());
      v = Math.min(v, _maxVal(newState, player));
    }
    return v;
  }
}

module.exports = {
  minimax: minimax
};
