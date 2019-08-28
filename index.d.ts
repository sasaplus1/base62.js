/**
 * decode to decimal number from base62 string
 *
 * @param str base62 string
 * @param [baseTable=basicTable] base62 table
 * @throws {TypeError} str is not a string
 * @throws {Error} str is unexpected format
 * @throws {Error} baseTable is not 62 in length
 */
export declare function decode(str: string, baseTable?: string): number;
/**
 * encode to base62 string from number
 *
 * @param num integer
 * @param [baseTable=basicTable] base62 table
 * @throws {TypeError} num is not an Integer
 * @throws {Error} baseTable is not 62 in length
 */
export declare function encode(num: number, baseTable?: string): string;
