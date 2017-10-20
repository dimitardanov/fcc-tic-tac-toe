const expect = require('chai').expect;

const h = require('../helpers/helpers.js');

describe('range func', function() {
  it('should return empty list if given 0', function() {
    expect(h.range(0)).to.be.an('array').that.is.empty;
  });

  it('should return an array of length the given number', function() {
    expect(h.range(139).length).to.equal(139);
  });

  it('should return a sequence of ascending numbers', function() {
    expect(h.range(4)).to.deep.equal([0,1,2,3]);
  });
});
