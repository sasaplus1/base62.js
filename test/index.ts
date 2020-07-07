import assert = require('assert');

import { decode, encode } from '../index';

describe('base62', function () {
  const originalTable =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  describe('decode()', function () {
    it('should threw error if param type is not a string', function () {
      /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
      assert.throws(function () {
        decode(1 as any);
      });
      assert.throws(function () {
        decode(true as any);
      });
      assert.throws(function () {
        decode(null as any);
      });
      assert.throws(function () {
        decode(undefined as any);
      });
      assert.throws(function () {
        decode(function () {} as any);
      });
      if (typeof Symbol !== 'undefined') {
        assert.throws(function () {
          decode(Symbol() as any);
        });
      }
      /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
    });

    it('should threw error if param is not an integer', function () {
      assert.throws(function () {
        decode('');
      });
      assert.throws(function () {
        decode('-');
      });
      assert.throws(function () {
        decode('0.1');
      });
    });

    it('should threw error if baseTable is not 62 in length', function () {
      assert.throws(function () {
        decode('0', '0123456789');
      });
    });

    it('should convert to integer from base62 string', function () {
      assert(decode('0') === 0);
      assert(decode('Z') === 61);
      assert(decode('10') === 62);
      assert(decode('-0') === 0);
      assert(decode('-Z') === -61);
      assert(decode('-10') === -62);
      assert(decode('2lkCB1') === 2147483647);
      assert(decode('-2lkCB2') === -2147483648);
    });

    it('should convert to integer from base62 string with original table', function () {
      assert(decode('0', originalTable) === 0);
      assert(decode('z', originalTable) === 61);
      assert(decode('10', originalTable) === 62);
      assert(decode('-0', originalTable) === 0);
      assert(decode('-z', originalTable) === -61);
      assert(decode('-10', originalTable) === -62);
      assert(decode('2LKcb1', originalTable) === 2147483647);
      assert(decode('-2LKcb2', originalTable) === -2147483648);
    });
  });

  describe('encode()', function () {
    it('should threw error if param type is not a number', function () {
      /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
      assert.throws(function () {
        encode('a' as any);
      });
      assert.throws(function () {
        encode(true as any);
      });
      assert.throws(function () {
        encode(null as any);
      });
      assert.throws(function () {
        encode(undefined as any);
      });
      assert.throws(function () {
        encode(function () {} as any);
      });
      if (typeof Symbol !== 'undefined') {
        assert.throws(function () {
          encode(Symbol() as any);
        });
      }
      /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
    });

    it('should threw error if param is not an integer', function () {
      assert.throws(function () {
        encode(0.1);
      });
      assert.throws(function () {
        encode(NaN);
      });
      assert.throws(function () {
        encode(Infinity);
      });
      assert.throws(function () {
        encode(-Infinity);
      });
    });

    it('should convert to base62 string from integer', function () {
      assert(encode(0) === '0');
      assert(encode(61) === 'Z');
      assert(encode(62) === '10');
      assert(encode(-0) === '0');
      assert(encode(-61) === '-Z');
      assert(encode(-62) === '-10');
      assert(encode(2147483647) === '2lkCB1');
      assert(encode(-2147483648) === '-2lkCB2');
    });

    it('should convert to base62 string from integer with original table', function () {
      assert(encode(0, originalTable) === '0');
      assert(encode(61, originalTable) === 'z');
      assert(encode(62, originalTable) === '10');
      assert(encode(-0, originalTable) === '0');
      assert(encode(-61, originalTable) === '-z');
      assert(encode(-62, originalTable) === '-10');
      assert(encode(2147483647, originalTable) === '2LKcb1');
      assert(encode(-2147483648, originalTable) === '-2LKcb2');
    });
  });
});
