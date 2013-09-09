var expect, base62;

if (typeof module !== 'undefined') {
  expect = require('expect.js');
  base62 = require('../');
} else {
  expect = this.expect;
  base62 = this.base62;
}

describe('base62', function() {

  describe('#decode()', function() {

    it('should throw error if parameter is not a number', function() {
      function f(v) {
        return function() {
          base62.decode(v);
        };
      }

      function fn(e) {
        expect(e).to.be.a(Error);
      }

      expect(f('')).to.throwError(fn);
      expect(f('-')).to.throwError(fn);
    });

    it('should throw error if parameter type is not a string', function() {
      function f(v) {
        return function() {
          base62.decode(v);
        };
      }

      function fn(e) {
        expect(e).to.be.a(TypeError);
      }

      expect(f(1)).to.throwError(fn);
      expect(f(true)).to.throwError(fn);
      expect(f(null)).to.throwError(fn);
      expect(f(void 0)).to.throwError(fn);
      expect(f(function() {})).to.throwError(fn);
    });

    it('should convert to number from base62 string', function() {
      expect(base62.decode('0')).to.be(0);
      expect(base62.decode('Z')).to.be(61);
      expect(base62.decode('10')).to.be(62);
      expect(base62.decode('-0')).to.be(0);
      expect(base62.decode('-Z')).to.be(-61);
      expect(base62.decode('-10')).to.be(-62);
      expect(base62.decode('2lkCB1')).to.be(2147483647);
      expect(base62.decode('-2lkCB2')).to.be(-2147483647);
    });

  });

  describe('#encode()', function() {

    it('should throw error if parameter is not a finite number', function() {
      function f(v) {
        return function() {
          base62.encode(v);
        };
      }

      function fn(e) {
        expect(e).to.be.a(Error);
      }

      expect(f(NaN)).to.throwError(fn);
      expect(f(Infinity)).to.throwError(fn);
      expect(f(-Infinity)).to.throwError(fn);
    });

    it('should throw error if parameter type is not a number', function() {
      function f(v) {
        return function() {
          base62.encode(v);
        };
      }

      function fn(e) {
        expect(e).to.be.a(TypeError);
      }

      expect(f('a')).to.throwError(fn);
      expect(f(true)).to.throwError(fn);
      expect(f(null)).to.throwError(fn);
      expect(f(void 0)).to.throwError(fn);
      expect(f(function() {})).to.throwError(fn);
    });

    it('should convert to base62 string from number', function() {
      expect(base62.encode(0)).to.be('0');
      expect(base62.encode(61)).to.be('Z');
      expect(base62.encode(62)).to.be('10');
      expect(base62.encode(-0)).to.be('0');
      expect(base62.encode(-61)).to.be('-Z');
      expect(base62.encode(-62)).to.be('-10');
      expect(base62.encode(2147483647)).to.be('2lkCB1');
      expect(base62.encode(-2147483647)).to.be('-2lkCB2');
    });

  });

});
