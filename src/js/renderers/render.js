
var helpers = require('../helpers/helpers.js');
var emptyCellTempl = require('../templates/empty-cell.hbs');
var circleTempl = require('../templates/circle.hbs');
var crossTempl = require('../templates/cross.hbs');
var prefsDialogTempl = require('../templates/prefsDialog.hbs');
var gameOverDialogTempl = require('../templates/gameOverDialog.hbs');
var diagonalStrikeTempl = require('../templates/diagonalLine.hbs');
var straightStrikeTempl = require('../templates/straightLine.hbs');

function renderCells(parent, numCells) {
  var cells = helpers.range(numCells);
  parent.innerHTML = emptyCellTempl({cells: cells});
  return parent;
}

function renderCircle(parent) {
  parent.innerHTML = circleTempl();
  return parent;
}

function renderCross(parent) {
  parent.innerHTML = crossTempl();
  return parent;
}

function renderDialog(parent, type, data) {
  if (type == 'prefs') {
    var dialogTempl = prefsDialogTempl;
  } else {
    var dialogTempl = gameOverDialogTempl;
  }
  parent.insertAdjacentHTML('beforeend', dialogTempl(data));
  var dialogBgHTML = document.querySelector('.dialog-bg');
  var dialogHTML = document.querySelector('.dialog');
  dialogBgHTML.classList.add('fade-in-bg');
  dialogHTML.classList.add('fade-in-dialog');
  return dialogHTML;
}

function removeDialog(delay) {
  var bg = document.querySelector('.dialog-bg');
  var dialog = document.querySelector('.dialog');
  bg.classList.remove('fade-in-bg');
  bg.classList.add('fade-out-bg');
  dialog.classList.remove('fade-in-dialog');
  dialog.classList.add('fade-out-dialog');
  setTimeout(function() {
    bg.remove();
    dialog.remove();
  }, delay);
}

function updateScore(element, value) {
  console.log(value);
  element.textContent = value;
}

function deactivateCell(cell) {
  if (typeof cell == 'number') {
    cell = document.getElementById(cell);
  }
  cell.classList.remove('free');
}

function isCellFree(element) {
  return (element.classList.contains('cell') &&
          element.classList.contains('free'));
}

function showPlayerBoard(element) {
  element.classList.add('player-active');
}

function hidePlayerBoard(element) {
  element.classList.remove('player-active');
}

function setBoardText(element, text) {
  element.textContent = text;
}

function diagonalStrike(parent, isFirstPlayer, isTopLeftBottomRight) {
  var data = {
    playerClass: 'second-player',
    orientation: 'bottomLeft-topRight'
  };
  if (isFirstPlayer) {
    data.playerClass = 'first-player';
  }
  if (isTopLeftBottomRight) {
    data.orientation = 'topLeft-bottomRight';
  }
  parent.insertAdjacentHTML('beforeend', diagonalStrikeTempl(data));
}

function straightStrike(parent, isFirstPlayer, isHorizontal, pos) {
  var data = {
    playerClass: 'second-player',
    orientation: 'vertical',
    pos: null
  };
  if (isFirstPlayer) {
    data.playerClass = 'first-player';
  }
  if (isHorizontal) {
    data.orientation = 'horizontal';
  }
  data.pos = ['first', 'second', 'third'][pos];
  parent.insertAdjacentHTML('beforeend', straightStrikeTempl(data));
}

module.exports = {
  emptyCells: renderCells,
  circle: renderCircle,
  cross: renderCross,
  dialog: renderDialog,
  removeDialog: removeDialog,
  updateScore: updateScore,
  deactivateCell: deactivateCell,
  isCellFree: isCellFree,
  showPlayerBoard: showPlayerBoard,
  hidePlayerBoard: hidePlayerBoard,
  setBoardText: setBoardText,
  diagonalStrike: diagonalStrike,
  straightStrike: straightStrike
};
