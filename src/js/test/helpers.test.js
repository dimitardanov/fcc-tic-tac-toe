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

describe('sum func', function() {
  it('should consider undefined as 0', function() {
    expect(h.sum([undefined, undefined, undefined])).to.equal(0);
  });

  it('should ignore undefined elements', function() {
    expect(h.sum([undefined, 10, 1])).to.equal(11);
  });

  it('should return the sum of the elements of the array', function() {
    expect(h.sum([1, 10, 10])).to.equal(21);
  });
});

describe('createRowValues func', function() {
  before(function() {
    this.gameArray = [
      0, 1, 2,
      3, undefined, 5,
      6, 7, 8
    ];
    this.rowValues = [
      3, 8, 21,
      9, 8, 15,
      8, 8
    ];
  });

  after(function() {
    delete this.gameArray;
    delete this.rowValues;
  });

  it('should return an array with length of 8', function() {
    expect(h.createRowValues(this.gameArray))
      .to.be.an('array')
      .and.to.have.lengthOf(8);
  });

  it('should return an array of sums of values of possible rows', function() {
    expect(h.createRowValues(this.gameArray)).to.deep.equal(this.rowValues);
  });
});

describe('isDraw func', function() {
  it('should return true if the array has no other values than 11, 12 or 21',
    function() {
      expect(h.isDraw([12, 11])).to.be.true;
      expect(h.isDraw([11, 21])).to.be.true;
      expect(h.isDraw([12, 21])).to.be.true;
      expect(h.isDraw([11, 12, 21, 12])).to.be.true;
    }
  );

  it('should return false if array contains values other than 11, 12, 21',
    function() {
      expect(h.isDraw([1, 11, 12, 21])).to.be.false;
    }
  );
});
