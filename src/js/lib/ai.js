
const shuffle = require('../helpers/helpers.js').shuffle;

function round1Player0Action(state, player) {
  var rand = Math.random();
  if (rand < 0.6) {
    return state.actRandomCorner(player.getId());
  } else if (rand < 0.9) {
    return state.actCenter(player.getId());
  } else {
    return state.actRandomEdge(player.getId());
  }
}

function alphaBetaSearch(state, player) {
  var alpha = -Infinity;
  var beta = Infinity;
  return _maxABVal(state, player, alpha, beta)[1];
}

function _maxABVal(state, player, alpha, beta) {
  if (state.isTerminal(player)) {
    return [state.utilityFor(player), state.selectRandomAction()];
  } else {
    var optAction;
    var v = -Infinity;
    var actions = shuffle(state.getActions());
    for (var i = 0; i < actions.length; i++) {
      var newState = state.createNew(actions[i], player);
      var minV = _minABVal(newState, player, alpha, beta);
      if (v < minV) {
        v = minV;
        optAction = actions[i];
      }
      if (v >= beta) {
        return [v, optAction];
      }
      alpha = Math.max(alpha, v);
    }
    return [v, optAction];
  }
}

function _minABVal(state, player, alpha, beta) {
  if (state.isTerminal(player)) {
    return state.utilityFor(player);
  } else {
    var v = Infinity;
    var actions = shuffle(state.getActions());
    for (var i = 0; i < actions.length; i++) {
      var newState = state.createNew(actions[i], player.getOpponent());
      v = Math.min(v, _maxABVal(newState, player, alpha, beta)[0]);
      if (v <= alpha) {
        return v;
      }
      beta = Math.min(beta, v);
    }
    return v;
  }
}

module.exports = {
  round1Player0Action: round1Player0Action,
  alphaBetaSearch: alphaBetaSearch
};
