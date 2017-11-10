
const helpers = require('../helpers/helpers.js');

function State() {
  this.state = [];
  for (var i = 0; i < 9; i++) {
    this.state[i] = undefined;
  }
  this.cornerActions = [0, 2, 6, 8];
  this.edgeActions = [1, 3, 5, 7];
}

State.prototype.getActions = function() {
  var acc = [];
  for (var i = 0; i < this.state.length; i++) {
    if (this.state[i] === undefined) {
      acc.push(i);
    }
  }
  return acc;
};

State.prototype.hasActionsLeft = function() {
  return this.getActions().length > 0;
};

State.prototype.takeAction = function(action, playerId) {
  if (this.state[action] != undefined) {
    throw new Error('Non empty state action.');
  } else if (action < 0 || action >= this.state.length) {
    throw new Error('Cell not on the state.');
  } else {
    this.state[action] = playerId;
  }
};

State.prototype.isActionCenterFree = function() {
  return this.state[4] == undefined;
};

State.prototype.actCenter = function(playerId) {
  if (this.isActionCenterFree()) {
    this.state[4] = playerId;
    return 4;
  } else {
    throw new Error('Non empty state cell.');
  }
};

State.prototype._selectRandomActionFrom = function(actions) {
  var randomActionIndex = Math.floor(Math.random() * actions.length);
  return actions[randomActionIndex];
};

State.prototype.selectRandomAction = function() {
  return this._selectRandomActionFrom(this.getActions());
};

State.prototype._takeRandomActionFrom = function(playerId, actions, msg) {
  for (var i = 0; i < 4; i++) {
    var randomIndex = Math.floor(actions.length * Math.random());
    var action = actions[randomIndex];
    actions.splice(randomIndex, 1);
    if (this.state[action] == undefined) {
      this.state[action] = playerId;
      return action;
    }
  }
  throw new Error(msg);
};

State.prototype.actRandomCorner = function(playerId) {
  var msg = 'Cannot play corner cell';
  return this._takeRandomActionFrom(playerId, this.cornerActions, msg);
};

State.prototype.actRandomEdge = function(playerId) {
  var msg = 'Cannot play side cell';
  return this._takeRandomActionFrom(playerId, this.edgeActions, msg);
};

State.prototype.utilityFor = function(player) {
  return helpers.resolveBoard(
    this.state, player.getId(), player.getOpponentId());
};

State.prototype.createNew = function(action, player) {
  var newState = this._duplicate();
  newState.takeAction(action, player.getId());
  return newState;
};

State.prototype._duplicate = function() {
  var newState = new State();
  for (var i = 0; i < this.state.length; i++) {
    if (this.state[i]) {
      newState.takeAction(i, this.state[i]);
    }
  }
  if (!this._isEquivalentTo(newState)) {
    throw new Error('boards different');
  }
  return newState;
};

State.prototype._isEquivalentTo = function(state2) {
  return this.state.every(function(el, i) {
    return el == state2.state[i];
  });
};

State.prototype.isTerminal = function(player) {
  return [-1, 0, 1].includes(this.utilityFor(player));
};

module.exports = {
  State: State
};
