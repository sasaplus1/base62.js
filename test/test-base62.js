var assert, base62;

if (typeof window === 'undefined') {
  assert = require('chai').assert;
  base62 = require('../base62');
} else {
  assert = chai.assert;
  base62 = window.Base62;
}

suite('base62のテスト', function () {

  suite('decode関数のテスト', function () {

    test('"0"を渡して0が返ること', function () {
      assert.strictEqual(base62.decode('0'), 0);
    });

    test('"Z"を渡して61が返ること', function () {
      assert.strictEqual(base62.decode('Z'), 61);
    });

    test('"10"を渡して62が返ること', function () {
      assert.strictEqual(base62.decode('10'), 62);
    });

    test('"ZZ"を渡して3843が返ること', function () {
      assert.strictEqual(base62.decode('ZZ'), 3843);
    });

    test('"1000000"を渡して56800235584が返ること', function () {
      assert.strictEqual(base62.decode('1000000'), 56800235584);
    });

    test('"ZZZZZZZ"を渡して3521614606207が返ること', function () {
      assert.strictEqual(base62.decode('ZZZZZZZ'), 3521614606207);
    });

    test('"-0"を渡して0が返ること', function () {
      assert.strictEqual(base62.decode('-0'), 0);
    });

    test('"-Z"を渡して-61が返ること', function () {
      assert.strictEqual(base62.decode('-Z'), -61);
    });

    test('"-10"を渡して-62が返ること', function () {
      assert.strictEqual(base62.decode('-10'), -62);
    });

    test('"-ZZ"を渡して-3843が返ること', function () {
      assert.strictEqual(base62.decode('-ZZ'), -3843);
    });

    test('"-1000000"を渡して-56800235584が返ること', function () {
      assert.strictEqual(base62.decode('-1000000'), -56800235584);
    });

    test('"-ZZZZZZZ"を渡して-3521614606207が返ること', function () {
      assert.strictEqual(base62.decode('-ZZZZZZZ'), -3521614606207);
    });

    test('"-"を渡してNaNが返ること', function () {
      assert.strictEqual(isNaN(base62.decode('-')), true);
    });

    test('undefinedを渡してNaNが返ること', function () {
      assert.strictEqual(isNaN(base62.decode()), true);
    });

    test('空文字を渡してNaNが返ること', function () {
      assert.strictEqual(isNaN(base62.decode('')), true);
    });

    test('0を渡してNaNが返ること', function () {
      assert.strictEqual(isNaN(base62.decode(0)), true);
    });

    test('falseを渡してNaNが返ること', function () {
      assert.strictEqual(isNaN(base62.decode(false)), true);
    });

  });

  suite('encode関数のテスト', function () {

    test('0を渡して"0"が返ること', function () {
      assert.strictEqual(base62.encode(0), '0');
    });

    test('61を渡して"Z"が返ること', function () {
      assert.strictEqual(base62.encode(61), 'Z');
    });

    test('62を渡して"10"が返ること', function () {
      assert.strictEqual(base62.encode(62), '10');
    });

    test('3843を渡して"ZZ"が返ること', function () {
      assert.strictEqual(base62.encode(3843), 'ZZ');
    });

    test('56800235584を渡して"1000000"が返ること', function () {
      assert.strictEqual(base62.encode(56800235584), '1000000');
    });

    test('3521614606207を渡して"ZZZZZZZ"が返ること', function () {
      assert.strictEqual(base62.encode(3521614606207), 'ZZZZZZZ');
    });

    test('-0を渡して"0"が返ること', function () {
      assert.strictEqual(base62.encode(-0), '0');
    });

    test('-61を渡して"-Z"が返ること', function () {
      assert.strictEqual(base62.encode(-61), '-Z');
    });

    test('-62を渡して"-10"が返ること', function () {
      assert.strictEqual(base62.encode(-62), '-10');
    });

    test('-3843を渡して"-ZZ"が返ること', function () {
      assert.strictEqual(base62.encode(-3843), '-ZZ');
    });

    test('-56800235584を渡して"-1000000"が返ること', function () {
      assert.strictEqual(base62.encode(-56800235584), '-1000000');
    });

    test('-3521614606207を渡して"-ZZZZZZZ"が返ること', function () {
      assert.strictEqual(base62.encode(-3521614606207), '-ZZZZZZZ');
    });

    test('10.5を渡して"a"が返ること', function () {
      assert.strictEqual(base62.encode(10.5), 'a');
    });

    test('-10.5を渡して"-a"が返ること', function () {
      assert.strictEqual(base62.encode(-10.5), '-a');
    });

    test('undefinedを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(), '');
    });

    test('NaNを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(NaN), '');
    });

    test('Infinityを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(Infinity), '');
    });

    test('文字列を渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode('base62'), '');
    });

    test('falseを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(false), '');
    });

  });

});
