var expect, base62;

if (typeof module !== 'undefined') {
  expect = require('expect.js');
  base62 = require('../');
} else {
  expect = this.expect;
  base62 = this.base62;
}

describe('index', function() {

  it('should export some functions', function() {
    expect(base62).to.be.a(Function);
    expect(base62).to.only.have.keys([
      'decode', 'encode'
    ]);
  });

});
