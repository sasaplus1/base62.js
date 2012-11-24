var assert, base62;

if (typeof window === 'undefined') {
  assert = require('chai').assert;
  base62 = require('../base62');
} else {
  assert = chai.assert;
  base62 = window.Base62;
}

suite('base62のテスト', function () {

  suite('changeTable関数のテスト', function () {

    test('"09azAZ"テーブルに切り替えられること', function () {
      assert.doesNotThrow(function () {
        base62.changeTable('09azAZ');
      });
    });

    test('"09AZaz"テーブルに切り替えられること', function () {
      assert.doesNotThrow(function () {
        base62.changeTable('09AZaz');
      });
    });

    test('存在しないテーブルに切り替えると例外が投げられること', function () {
      assert.throws(function () {
        base62.changeTable('');
      });
    });

  });

  suite('decode関数のテスト', function () {

    test('空文字を渡してNaNが返ること', function () {
      assert.isTrue(isNaN(base62.decode('')));
    });

    test('"-"を渡してNaNが返ること', function () {
      assert.isTrue(isNaN(base62.decode('-')));
    });

    test('string以外の型を渡してNaNが返ること', function () {
      assert.isTrue(isNaN(base62.decode(null)));
      assert.isTrue(isNaN(base62.decode(void 0)));
      assert.isTrue(isNaN(base62.decode(0)));
      assert.isTrue(isNaN(base62.decode(1)));
      assert.isTrue(isNaN(base62.decode(true)));
      assert.isTrue(isNaN(base62.decode(false)));
    });

    suite('"09azAZ"テーブルの場合', function () {

      setup(function () {
        base62.changeTable('09azAZ');
      });

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

      test('"100"を渡して3844が返ること', function () {
        assert.strictEqual(base62.decode('100'), 3844);
      });

      test('"-0"を渡して0が返ること', function () {
        assert.strictEqual(base62.decode('-0'), 0);
      });

      test('"-Z"を渡して-61が返ること', function () {
        assert.strictEqual(base62.decode('-Z'), -61);
      });

    });

    suite('"09AZaz"テーブルの場合', function () {

      setup(function () {
        base62.changeTable('09AZaz');
      });

      test('"0"を渡して0が返ること', function () {
        assert.strictEqual(base62.decode('0'), 0);
      });

      test('"z"を渡して61が返ること', function () {
        assert.strictEqual(base62.decode('z'), 61);
      });

      test('"10"を渡して62が返ること', function () {
        assert.strictEqual(base62.decode('10'), 62);
      });

      test('"zz"を渡して3843が返ること', function () {
        assert.strictEqual(base62.decode('zz'), 3843);
      });

      test('"100"を渡して3844が返ること', function () {
        assert.strictEqual(base62.decode('100'), 3844);
      });

      test('"-0"を渡して0が返ること', function () {
        assert.strictEqual(base62.decode('-0'), 0);
      });

      test('"-z"を渡して-61が返ること', function () {
        assert.strictEqual(base62.decode('-z'), -61);
      });

    });

  });

  suite('encode関数のテスト', function () {

    test('NaNを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(NaN), '');
    });

    test('Infinityを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(Infinity), '');
    });

    test('-Infinityを渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(-Infinity), '');
    });

    test('number以外の型を渡して空文字が返ること', function () {
      assert.strictEqual(base62.encode(null), '');
      assert.strictEqual(base62.encode(void 0), '');
      assert.strictEqual(base62.encode(''), '');
      assert.strictEqual(base62.encode('a'), '');
      assert.strictEqual(base62.encode(true), '');
      assert.strictEqual(base62.encode(false), '');
    });

    suite('"09azAZ"テーブルの場合', function () {

      setup(function () {
        base62.changeTable('09azAZ');
      });

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

      test('-0を渡して"0"が返ること', function () {
        assert.strictEqual(base62.encode(-0), '0');
      });

      test('-61を渡して"-Z"が返ること', function () {
        assert.strictEqual(base62.encode(-61), '-Z');
      });

      test('10.0, 10.1, 10.9を渡してすべて"a"が返ること', function () {
        assert.strictEqual(base62.encode(10.0), 'a');
        assert.strictEqual(base62.encode(10.1), 'a');
        assert.strictEqual(base62.encode(10.9), 'a');
      });

    });

    suite('"09AZaz"テーブルの場合', function () {

      setup(function () {
        base62.changeTable('09AZaz');
      });

      test('0を渡して"0"が返ること', function () {
        assert.strictEqual(base62.encode(0), '0');
      });

      test('61を渡して"z"が返ること', function () {
        assert.strictEqual(base62.encode(61), 'z');
      });

      test('62を渡して"10"が返ること', function () {
        assert.strictEqual(base62.encode(62), '10');
      });

      test('3843を渡して"zz"が返ること', function () {
        assert.strictEqual(base62.encode(3843), 'zz');
      });

      test('-0を渡して"0"が返ること', function () {
        assert.strictEqual(base62.encode(-0), '0');
      });

      test('-61を渡して"-z"が返ること', function () {
        assert.strictEqual(base62.encode(-61), '-z');
      });

      test('10.0, 10.1, 10.9を渡してすべて"A"が返ること', function () {
        assert.strictEqual(base62.encode(10.0), 'A');
        assert.strictEqual(base62.encode(10.1), 'A');
        assert.strictEqual(base62.encode(10.9), 'A');
      });

    });

  });

});
