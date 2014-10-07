var expect = this.expect || require('expect.js'),
    base62 = this.base62 || require('../');

describe('index', function() {

  it('should export some functions', function() {
    expect(base62.createConverter).to.be.a(Function);
    expect(base62.decode).to.be.a(Function);
    expect(base62.encode).to.be.a(Function);
  });

});
