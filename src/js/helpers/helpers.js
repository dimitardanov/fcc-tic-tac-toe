
function range(num) {
  var vals = [];
  for (var i = 0; i < num; i++) {
    vals.push(i);
  }
  return vals;
}

function sum(arr) {
  return arr.reduce(function(acc, el) {
    if (el == undefined) {
      return acc;
    } else {
      return acc + el;
    }
  }, 0);
}

function createRowValues(arr) {
  var indexes = [
    // Rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Columns
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonals
    [0, 4, 8], [2, 4, 6]
  ];
  var rowValues = [];
  for (var i = 0; i < indexes.length; i++) {
    var row = indexes[i].reduce(function(acc, ind) {
      acc.push(arr[ind]);
      return acc;
    }, []);
    rowValues.push(sum(row));
  }
  return rowValues;
}

function isDraw(rowVals) {
  var drawCriteria = [11, 12, 21];
  return rowVals.every(function(el) {
    return drawCriteria.some(function(dc) {
      return dc == el;
    });
  });
}

function resolveBoard(arr, playerId, opponentId) {
  var playerWin = 3 * playerId;
  var opponentWin = 3 * opponentId;
  var rows = createRowValues(arr);
  if (isDraw(rows)) {
    return 0;
  } else if (rows.includes(playerWin)) {
    return 1;
  } else if (rows.includes(opponentWin)) {
    return -1;
  } else {
    return undefined;
  }
}

function shuffle(arr) {
  var randArr = [];
  var arrCopy = arr.map(function(el) { return el; });
  while (arrCopy.length > 0) {
    var ind = Math.floor(Math.random() * arrCopy.length);
    randArr.push(arrCopy.splice(ind, 1)[0]);
  }
  return randArr;
}

module.exports = {
  range: range,
  sum: sum,
  createRowValues: createRowValues,
  isDraw: isDraw,
  resolveBoard: resolveBoard,
  shuffle: shuffle
};
