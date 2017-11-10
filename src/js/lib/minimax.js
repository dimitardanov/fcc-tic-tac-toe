
function State(board) {
  this.board = board;
}

State.prototype.isTerminal = function(player) {
  return [-1, 0, 1].includes(this.board.resolveBoardForPlayer(player));
};

State.prototype.utility = function(player) {
  return this.board.resolveBoardForPlayer(player);
};

State.prototype.getActions = function() {
  return this.board.getFreeCellsIndexes();
};

State.prototype.createNew = function(action, player) {
  var newBoard = this.board.createNew(action, player.getId());
  return new State(newBoard);
};

function minimax(state, player) {
  var optAction;
  var v = -Infinity;
  var actions = state.getActions();
  for (var i = 0; i < actions.length; i++) {
    var newState = state.createNew(actions[i], player);
    var maxV = Math.max(v, minVal(newState, player));
    if (v < maxV) {
      v = maxV;
      optAction = actions[i];
    }
  }
  return optAction;
}

function maxVal(state, player) {
  if (state.isTerminal(player)) {
    return state.utility(player);
  } else {
    var v = -Infinity;
    var actions = state.getActions();
    for (var i = 0; i < actions.length; i++) {
      var newState = state.createNew(actions[i], player);
      v = Math.max(v, minVal(newState, player));
    }
    return v;
  }
}

function minVal(state, player) {
  if (state.isTerminal(player)) {
    return state.utility(player);
  } else {
    var v = Infinity;
    var actions = state.getActions();
    for (var i = 0; i < actions.length; i++) {
      var newState = state.createNew(actions[i], player.getOpponent());
      v = Math.min(v, maxVal(newState, player));
    }
    return v;
  }
}

module.exports = {
  State: State,
  minimax: minimax
};
