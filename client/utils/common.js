/**
 * Checks if passed in item is an Object and is emtpy.
 * @param {*} a The value to test for Object-ness.
 * @return {boolean} Whether or not this is an Object (that is NOT empty).
 */
export const isEmptyObj = obj => JSON.stringify(obj) === '{}';

/**
 * Checks if passed in item is an Array and is emtpy.
 * @param {*} a The value to test for Array-ness.
 * @return {boolean} Whether or not this is an Array (that is NOT empty).
 */
export const isArrayEmpty = a => (!Array.isArray(a) || !a.length);

/**
 * Checks if passed in item is an empty String.
 * @param {*} a The value to test for String-ness.
 * @return {boolean} Whether or not this is an empty String.
 */
export const isEmptyString = a => (a === '');

/**
 * Checks if passed in item is Undefined.
 * @param {*} i The value test for Undefined-ness.
 * @return {boolean} Whether or not this is an Array (that is NOT empty).
 */
export const isUndefined = i => typeof i === 'undefined';
