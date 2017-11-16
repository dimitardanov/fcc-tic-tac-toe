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

describe('shuffle func', function() {
  before(function() {
    this.initArr = ['a', 'b', 'c', 'd'];
    this.newArr = h.shuffle(this.initArr);
  });

  after(function() {
    delete this.initArr;
    delete this.newArr;
  });

  it('should return empty array if given empty array', function() {
    expect(h.shuffle([])).to.be.an('array').and.to.be.empty;
  });

  it('should return an array with the same length', function() {
    expect(this.newArr).to.have.lengthOf(this.initArr.length);
  });

  it('should return array that is not the same as the given', function() {
    expect(this.newArr).to.not.deep.equal(this.initArr);
  });

  it('should return an array with the same items', function() {
    expect(this.newArr).to.include('a')
                       .and.to.include('b')
                       .and.to.include('c')
                       .and.to.include('d');
  });
});

describe('getWinSequence func', function() {
  beforeEach(function() {
    this.row0 = [10, 10, 10,
                 1, 1, 10,
                 10, 10, 1];
    this.row1 = [10, 1, 10,
                 1, 1, 1,
                 10, 10, 1];
    this.row2 = [10, 10, 1,
                 1, 10, 10,
                 1, 1, 1];
    this.col0 = [1, 10, 10,
                 1, 10, 1,
                 1, 1, 10];
    this.col1 = [10, 1, 10,
                 1, 1, 10,
                 10, 1, 1];
    this.col2 = [10, 1, 1,
                 1, 10, 1,
                 10, 1, 1];
    this.diag0 = [10, 1, 1,
                 1, 10, 10,
                 1, 1, 10];
    this.diag1 = [1, 1, 10,
                  1, 10, 1,
                  10, 1, 1];
  });

  afterEach(function() {
    delete this.row0;
    delete this.row1;
    delete this.row2;
    delete this.col0;
    delete this.col1;
    delete this.col2;
    delete this.diag0;
    delete this.diag1;
  });

  it('should return a two element-array', function() {
    expect(h.getWinSequence(this.row0, 1, 10))
        .to.be.an('array').and.to.have.lengthOf(2);
  });

  it('should return ["row", 0]', function() {
    expect(h.getWinSequence(this.row0, 1, 10)).to.deep.equal(['row', 0]);
  });

  it('should return ["row", 1]', function() {
    expect(h.getWinSequence(this.row1, 10, 1)).to.deep.equal(['row', 1]);
  });

  it('should return ["row", 2]', function() {
    expect(h.getWinSequence(this.row2, 10, 1)).to.deep.equal(['row', 2]);
  });

  it('should return ["col", 0]', function() {
    expect(h.getWinSequence(this.col0, 1, 10)).to.deep.equal(['col', 0]);
  });

  it('should return ["col", 1]', function() {
    expect(h.getWinSequence(this.col1, 1, 10)).to.deep.equal(['col', 1]);
  });

  it('should return ["col", 2]', function() {
    expect(h.getWinSequence(this.col2, 1, 10)).to.deep.equal(['col', 2]);
  });

  it('should return ["diagonal", 0]', function() {
    expect(h.getWinSequence(this.diag0, 10, 1)).to.deep.equal(['diagonal', 0]);
  });

  it('should return ["diagonal", 1]', function() {
    expect(h.getWinSequence(this.diag1, 10, 1)).to.deep.equal(['diagonal', 1]);
  });
});
