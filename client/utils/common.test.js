// Util functions
import {
  isEmptyObj,
  isArrayEmpty,
  isUndefined
} from './common';

describe('common util', () => {
  it('should check if object is empty', () => {
    const objectCheck = isEmptyObj({});
    expect(objectCheck).toEqual(true);
  });

  it('should check if object is NOT empty', () => {
    const objectCheck = isEmptyObj({ title: 'Foo' });
    expect(objectCheck).toEqual(false);
  });

  it('should check if array is empty', () => {
    const arrayCheck = isArrayEmpty([]);
    expect(arrayCheck).toEqual(true);
  });

  it('should check if array is NOT empty', () => {
    const arrayCheck = isArrayEmpty(['Foo']);
    expect(arrayCheck).toEqual(false);
  });

  it('should check if item is undefined', () => {
    const itemCheck = isUndefined(undefined);
    expect(itemCheck).toEqual(true);
  });

  it('should check if item is NOT undefined', () => {
    const itemCheck = isUndefined('Foo');
    expect(itemCheck).toEqual(false);
  });
});
