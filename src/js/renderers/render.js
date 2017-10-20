
var helpers = require('../helpers/helpers.js');
var emptyCellTempl = require('../templates/empty-cell.hbs');
var circleTempl = require('../templates/circle.hbs');
var crossTempl = require('../templates/cross.hbs');

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

module.exports = {
  emptyCells: renderCells,
  circle: renderCircle,
  cross: renderCross
};
