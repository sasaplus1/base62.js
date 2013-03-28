var assert, base62;

if (typeof window === 'undefined') {
  assert = require('chai').assert;
  base62 = require('../');
} else {
  assert = chai.assert;
  base62 = window.Base62;
}

suite('base62のテスト', function() {

  suite('インスタンス生成のテスト', function() {

    test('引数なしで生成できること', function() {
      assert.doesNotThrow(function() { new base62; }, base62,
          ' is unknown table key');
    });

    test('"09azAZ"テーブルを指定して生成できること', function() {
      assert.doesNotThrow(function() { new base62('09azAZ'); }, base62,
          '09azAZ is unknown table key');
    });

    test('"09AZaz"テーブルを指定して生成できること', function() {
      assert.doesNotThrow(function() { new base62('09AZaz'); }, base62,
          '09AZaz is unknown table key');
    });

    test('存在しないテーブルを指定すると例外が発生すること', function() {
      assert.throws(function() { new base62('AZaz09'); }, Error,
          'AZaz09 is unknown table key');

      assert.throws(function() { new base62('azAZ09'); }, Error,
          'azAZ09 is unknown table key');
    });

    test('string以外の型を渡すと例外が発生すること', function() {
      assert.throws(function() { new base62(1); }, TypeError,
          'Parameter "tableKeyStr" must be a string, not number');

      assert.throws(function() { new base62(true); }, TypeError,
          'Parameter "tableKeyStr" must be a string, not boolean');

      // undefined
      assert.throws(function() { new base62(void 0); }, TypeError,
          'Parameter "tableKeyStr" must be a string, not undefined');

      // null/object
      assert.throws(function() { new base62(null); }, TypeError,
          'Parameter "tableKeyStr" must be a string, not object');

      // function
      assert.throws(function() { new base62(function() {}); }, TypeError,
          'Parameter "tableKeyStr" must be a string, not function');
    });

  });

  suite('"09azAZ"テーブルでの関数のテスト', function() {
    var b;

    suiteSetup(function() {
      b = new base62('09azAZ');
    });

    suiteTeardown(function() {
      b = null;
    });

    suite('decode関数のテスト', function() {

      test('空文字を渡すと例外が発生すること', function() {
        assert.throws(function() { b.decode(''); }, Error,
            '"" is unsupported string format');
      });

      test('"-"を渡すと例外が発生すること', function() {
        assert.throws(function() { b.decode('-'); }, Error,
            '"-" is unsupported string format');
      });

      test('string以外の型を渡すと例外が発生すること', function() {
        assert.throws(function() { b.decode(1); }, TypeError,
            'Parameter "str" must be a string, not number');

        assert.throws(function() { b.decode(true); }, TypeError,
            'Parameter "str" must be a string, not boolean');

        // undefined
        assert.throws(function() { b.decode(void 0); }, TypeError,
            'Parameter "str" must be a string, not undefined');

        // null/object
        assert.throws(function() { b.decode(null); }, TypeError,
            'Parameter "str" must be a string, not object');

        // function
        assert.throws(function() { b.decode(function() {}); }, TypeError,
            'Parameter "str" must be a string, not function');
      });

      test('"0"を0に変換できること', function() {
        assert.strictEqual(b.decode('0'), 0, 'decode("0") should be return 0');
      });

      test('"Z"を61に変換できること', function() {
        assert.strictEqual(b.decode('Z'), 61,
            'decode("Z") should be return 61');
      });

      test('"10"を62に変換できること', function() {
        assert.strictEqual(b.decode('10'), 62,
            'decode("10") should be return 62');
      });

      test('"-0"を0に変換できること', function() {
        assert.strictEqual(b.decode('-0'), 0,
            'decode("-0") should be return 0');
      });

      test('"-Z"を-61に変換できること', function() {
        assert.strictEqual(b.decode('-Z'), -61,
            'decode("-Z") should be return -61');
      });

      test('"-10"を-62に変換できること', function() {
        assert.strictEqual(b.decode('-10'), -62,
            'decode("-10") should be return 62');
      });

      test('"2lkCB1"を2147483647に変換できること', function() {
        assert.strictEqual(b.decode('2lkCB1'), 2147483647,
            'decode("2lkCB1") should be return 2147483647');
      });

      test('"-2lkCB2"を-2147483648に変換できること', function() {
        assert.strictEqual(b.decode('-2lkCB2'), -2147483648,
            'decode("-2lkCB2") should be return -2147483648');
      });

    });

    suite('encode関数のテスト', function() {

      test('NaNを渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode(NaN); }, Error,
            'NaN is not a finite number');
      });

      test('Infinityを渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode(Infinity); }, Error,
            'Infinity is not a finite number');
      });

      test('-Infinityを渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode(-Infinity); }, Error,
            '-Infinity is not a finite number');
      });

      test('number以外の型を渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode('a'); }, TypeError,
            'Parameter "num" must be a number, not string');

        assert.throws(function() { b.encode(true); }, TypeError,
            'Parameter "num" must be a number, not boolean');

        // undefined
        assert.throws(function() { b.encode(void 0); }, TypeError,
            'Parameter "num" must be a number, not undefined');

        // null/object
        assert.throws(function() { b.encode(null); }, TypeError,
            'Parameter "num" must be a number, not object');

        // function
        assert.throws(function() { b.encode(function() {}); }, TypeError,
            'Parameter "num" must be a number, not function');
      });

      test('0を"0"に変換できること', function() {
        assert.strictEqual(b.encode(0), '0', 'encode(0) should be return "0"');
      });

      test('61を"Z"に変換できること', function() {
        assert.strictEqual(b.encode(61), 'Z',
            'encode(61) should be return "Z"');
      });

      test('62を"10"に変換できること', function() {
        assert.strictEqual(b.encode(62), '10',
            'encode(62) should be return "10"');
      });

      test('-0を"0"に変換できること', function() {
        assert.strictEqual(b.encode(-0), '0',
            'encode(-0) should be return "0"');
      });

      test('-61を"-Z"に変換できること', function() {
        assert.strictEqual(b.encode(-61), '-Z',
            'encode(-61) should be return "-Z"');
      });

      test('-62を"-10"に変換できること', function() {
        assert.strictEqual(b.encode(-62), '-10',
            'encode(-62) should be return "-10"');
      });

      test('2147483647を"2lkCB1"に変換できること', function() {
        assert.strictEqual(b.encode(2147483647), '2lkCB1',
            'encode(2147483647) should be return "2lkCB1"');
      });

      test('-2147483648を"-2lkCB2"に変換できること', function() {
        assert.strictEqual(b.encode(-2147483648), '-2lkCB2',
            'encode(-2147483648) should be return "-2lkCB2"');
      });

    });
  });

  suite('"09AZaz"テーブルでの関数のテスト', function() {
    var b;

    suiteSetup(function() {
      b = new base62('09AZaz');
    });

    suiteTeardown(function() {
      b = null;
    });

    suite('decode関数のテスト', function() {

      test('空文字を渡すと例外が発生すること', function() {
        assert.throws(function() { b.decode(''); }, Error,
            '"" is unsupported string format');
      });

      test('"-"を渡すと例外が発生すること', function() {
        assert.throws(function() { b.decode('-'); }, Error,
            '"-" is unsupported string format');
      });

      test('string以外の型を渡すと例外が発生すること', function() {
        assert.throws(function() { b.decode(1); }, TypeError,
            'Parameter "str" must be a string, not number');

        assert.throws(function() { b.decode(true); }, TypeError,
            'Parameter "str" must be a string, not boolean');

        // undefined
        assert.throws(function() { b.decode(void 0); }, TypeError,
            'Parameter "str" must be a string, not undefined');

        // null/object
        assert.throws(function() { b.decode(null); }, TypeError,
            'Parameter "str" must be a string, not object');

        // function
        assert.throws(function() { b.decode(function() {}); }, TypeError,
            'Parameter "str" must be a string, not function');
      });

      test('"0"を0に変換できること', function() {
        assert.strictEqual(b.decode('0'), 0, 'decode("0") should be return 0');
      });

      test('"z"を61に変換できること', function() {
        assert.strictEqual(b.decode('z'), 61,
            'decode("z") should be return 61');
      });

      test('"10"を62に変換できること', function() {
        assert.strictEqual(b.decode('10'), 62,
            'decode("10") should be return 62');
      });

      test('"-0"を0に変換できること', function() {
        assert.strictEqual(b.decode('-0'), 0,
            'decode("-0") should be return 0');
      });

      test('"-z"を-61に変換できること', function() {
        assert.strictEqual(b.decode('-z'), -61,
            'decode("-z") should be return -61');
      });

      test('"-10"を-62に変換できること', function() {
        assert.strictEqual(b.decode('-10'), -62,
            'decode("-10") should be return 62');
      });

      test('"2LKcb1"を2147483647に変換できること', function() {
        assert.strictEqual(b.decode('2LKcb1'), 2147483647,
            'decode("2LKcb1") should be return 2147483647');
      });

      test('"-2LKcb2"を-2147483648に変換できること', function() {
        assert.strictEqual(b.decode('-2LKcb2'), -2147483648,
            'decode("-2LKcb2") should be return -2147483648');
      });

    });

    suite('encode関数のテスト', function() {

      test('NaNを渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode(NaN); }, Error,
            'NaN is not a finite number');
      });

      test('Infinityを渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode(Infinity); }, Error,
            'Infinity is not a finite number');
      });

      test('-Infinityを渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode(-Infinity); }, Error,
            '-Infinity is not a finite number');
      });

      test('number以外の型を渡すと例外が発生すること', function() {
        assert.throws(function() { b.encode('a'); }, TypeError,
            'Parameter "num" must be a number, not string');

        assert.throws(function() { b.encode(true); }, TypeError,
            'Parameter "num" must be a number, not boolean');

        // undefined
        assert.throws(function() { b.encode(void 0); }, TypeError,
            'Parameter "num" must be a number, not undefined');

        // null/object
        assert.throws(function() { b.encode(null); }, TypeError,
            'Parameter "num" must be a number, not object');

        // function
        assert.throws(function() { b.encode(function() {}); }, TypeError,
            'Parameter "num" must be a number, not function');
      });

      test('0を"0"に変換できること', function() {
        assert.strictEqual(b.encode(0), '0', 'encode(0) should be return "0"');
      });

      test('61を"z"に変換できること', function() {
        assert.strictEqual(b.encode(61), 'z',
            'encode(61) should be return "z"');
      });

      test('62を"10"に変換できること', function() {
        assert.strictEqual(b.encode(62), '10',
            'encode(62) should be return "10"');
      });

      test('-0を"0"に変換できること', function() {
        assert.strictEqual(b.encode(-0), '0',
            'encode(-0) should be return "0"');
      });

      test('-61を"-z"に変換できること', function() {
        assert.strictEqual(b.encode(-61), '-z',
            'encode(-61) should be return "-z"');
      });

      test('-62を"-10"に変換できること', function() {
        assert.strictEqual(b.encode(-62), '-10',
            'encode(-62) should be return "-10"');
      });

      test('2147483647を"2LKcb1"に変換できること', function() {
        assert.strictEqual(b.encode(2147483647), '2LKcb1',
            'encode(2147483647) should be return "2LKcb1"');
      });

      test('-2147483648を"-2LKcb2"に変換できること', function() {
        assert.strictEqual(b.encode(-2147483648), '-2LKcb2',
            'encode(-2147483648) should be return "-2LKcb2"');
      });

    });
  });

});
