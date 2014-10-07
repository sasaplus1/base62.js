var expect = this.expect || require('expect.js'),
    base62 = this.base62 || require('../');

describe('utility', function() {

  describe('#isInteger()', function() {

    it('should returned false if param is not a number', function() {
      expect(base62.isInteger('a')).to.be(false);
      expect(base62.isInteger(true)).to.be(false);
      expect(base62.isInteger(null)).to.be(false);
      expect(base62.isInteger(void 0)).to.be(false);
      expect(base62.isInteger(function() {})).to.be(false);
    });

    it('should returned false if param is not a finite number', function() {
      expect(base62.isInteger(NaN)).to.be(false);
      expect(base62.isInteger(Infinity)).to.be(false);
      expect(base62.isInteger(-Infinity)).to.be(false);
    });

    it('should returned false if param is floating-point number', function() {
      expect(base62.isInteger(0.1)).to.be(false);
    });

    it('should returned true if param is an integer', function() {
      expect(base62.isInteger(0)).to.be(true);
      expect(base62.isInteger(9007199254740991)).to.be(true);
      expect(base62.isInteger(-9007199254740991)).to.be(true);
    });

  });

});
