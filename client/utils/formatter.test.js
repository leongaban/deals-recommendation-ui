// formatter functions
import {
  capitalizeFirst,
  truncate,
  guidGenerator,
  getCustomClass
} from './formatter';

describe('formatter util', () => {
  it('capitalizeFirst should capitalize 1st letter', () => {
    const upperCaseWord = capitalizeFirst('foo');
    expect(upperCaseWord).toEqual('Foo');
  });

  it('truncate should truncate word if over 20 characters', () => {
    const saying = 'Be the hero of your own story.';
    const truncated = truncate(saying);
    expect(truncated).toEqual('Be the hero of your ...');
  });

  it('truncate should not truncate word is less than 20 characters', () => {
    const saying = 'Hello World';
    const truncated = truncate(saying);
    expect(truncated).toEqual(saying);
  });

  it('guidGenerator should create an ID', () => {
    const id = guidGenerator();
    expect(id).toHaveLength(36);
  });

  it('getCustomClass should return a custom class based off type', () => {
    const classesTestItems = ['BOOL', 'TEXT', 'IMAGE'];
    classesTestItems.forEach((item) => {
      const classes = getCustomClass(item);
      expect(classes).toContain('mythor-form-field');
      expect(classes).toContain(`mythor-form-field-modal mythor-form-field-${item.toLowerCase()}`);
    });
  });
});
