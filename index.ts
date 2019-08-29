const basicTable =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * create index map
 *
 * @param table base62 string table
 */
function createIndexMap(table: string = basicTable): { [key: string]: number } {
  return table
    .split('')
    .reduce(function(result: { [key: string]: number }, value, index) {
      result[value] = index;
      return result;
    }, {});
}

const basicIndexMap = createIndexMap();

/**
 * decode to decimal number from base62 string
 *
 * @param str base62 string
 * @param [baseTable=basicTable] base62 table
 * @throws {TypeError} str is not a string
 * @throws {Error} str is unexpected format
 * @throws {Error} baseTable is not 62 in length
 */
export function decode(str: string, baseTable = basicTable): number {
  if (typeof str !== 'string') {
    throw new TypeError(`str must be a string: ${str}`);
  }

  if (!/^-?[\dA-Za-z]+$/.test(str)) {
    throw new Error(`unexpected format: ${str}`);
  }

  if (baseTable.length !== 62) {
    throw new Error('baseTable must be 62 in length');
  }

  const indexMap =
    baseTable === basicTable ? basicIndexMap : createIndexMap(baseTable);

  const isNegative = str[0] === '-';

  const numbers = (isNegative ? str.slice(1) : str).split('');
  const numbersLength = numbers.length;

  const result = numbers.reduce(function(result, n, index) {
    return result + indexMap[n] * Math.pow(62, numbersLength - index - 1);
  }, 0);

  return isNegative ? -result : result;
}

/**
 * encode to base62 string from number
 *
 * @param num integer
 * @param [baseTable=basicTable] base62 table
 * @throws {TypeError} num is not an Integer
 * @throws {Error} baseTable is not 62 in length
 */
export function encode(num: number, baseTable = basicTable): string {
  if (!Number.isSafeInteger(num)) {
    throw new TypeError(`num is must be an integer: ${num}`);
  }

  if (baseTable.length !== 62) {
    throw new Error('baseTable must be 62 in length');
  }

  if (num === 0) {
    return '0';
  }

  const result = [];

  let n = Math.abs(num);

  while (n > 0) {
    result.unshift(baseTable[n % 62]);
    n = Math.floor(n / 62);
  }

  return num < 0 ? `-${result.join('')}` : result.join('');
}
