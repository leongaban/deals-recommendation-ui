// Util functions
import {
  hasRights,
  validateEmail,
  validatePassword,
  validateChangePassword
} from './auth';

describe('auth util', () => {
  it('validateEmail should find a valid email.', () => {
    const isValid = validateEmail('foo@yum.com');
    expect(isValid).toEqual(['foo@yum.com']);
  });

  it('validateEmail should find an invalid email.', () => {
    const isValid = validateEmail('foo@bar.com');
    expect(isValid).toEqual(null);
  });

  it('should find a valid password.', () => {
    const validPassword = 'validPassword';
    const isValid = validatePassword(validPassword);
    expect(isValid).toEqual(true);
  });

  it('should find an invalid password.', () => {
    const inValidPassword = 'v';
    const isValid = validatePassword(inValidPassword);
    expect(isValid).toEqual(false);
  });

  it('should make sure that matching passwords returns true', () => {
    const isValid = validateChangePassword('foobar', 'foobar');
    expect(isValid).toEqual(true);
  });

  it('should make sure that non-matching passwords return false', () => {
    const isValid = validateChangePassword('foobar', 'barfoo');
    expect(isValid).toEqual(false);
  });
});

describe('validating rights', () => {
  it('should return true if the user has the proper rights', () => {
    const services = [{
      name: 'siskel',
      disabed: false,
      rights: [{ disabled: false, name: 'admin' }]
    }];

    expect(hasRights(services)).toBe(true);
  });

  it(
    'should return false if the user DOES NOT have the proper rights',
    () => {
      const services = [{
        name: 'siskel',
        disabed: true
      }];

      expect(hasRights(services)).toBe(false);
    }
  );

  it('should return false if the user\'s rights are malformed', () => {
    [null, undefined, [], '', false].forEach((val) => {
      expect(hasRights(val)).toBe(false);
    });
  });
});
