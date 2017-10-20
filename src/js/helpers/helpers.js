
function range(num) {
  var vals = [];
  for (var i = 0; i < num; i++) {
    vals.push(i);
  }
  return vals;
}

module.exports = {
  range: range
};
