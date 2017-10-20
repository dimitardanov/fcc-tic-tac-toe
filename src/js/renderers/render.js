
var helpers = require('../helpers/helpers.js');
var emptyCellTempl = require('../templates/empty-cell.hbs');

function renderCells(parent, numCells) {
  var cells = helpers.range(numCells);
  parent.innerHTML = emptyCellTempl({cells: cells});
  return parent;
}

module.exports = {
  emptyCells: renderCells,
};
