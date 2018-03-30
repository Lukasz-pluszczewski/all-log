export const ITERABLE_OPTIONS = {
  array: {
    keyQuotation: '',
    openingBrackets: '[',
    closingBrackets: ']',
    type: '',
    showKey: true,
  },
  object: {
    keyQuotation: `'`,
    openingBrackets: '{',
    closingBrackets: '}',
    type: '',
    showKey: true,
  },
  map: {
    keyQuotation: `'`,
    openingBrackets: '{',
    closingBrackets: '}',
    type: 'Map',
    showKey: true,
  },
  weakMap: {
    keyQuotation: `'`,
    openingBrackets: '{',
    closingBrackets: '}',
    type: 'WeakMap',
    showKey: true,
  },
  set: {
    keyQuotation: '',
    openingBrackets: '[',
    closingBrackets: ']',
    type: 'Set',
    showKey: false,
  },
  weakSet: {
    keyQuotation: '',
    openingBrackets: '[',
    closingBrackets: ']',
    type: 'WeakSet',
    showKey: false,
  },
};

export const LEVEL_PADDING = 4;
export const INDENTATION_SPACES_REGEX = /^[ ]*/;
export const STACKTRACE_PATH_REGEX = /(\/.+?):(\d+):(\d)/;

export const ERROR_MESSAGES = {
  timerNameRequired: 'Timer must have name to measure time',
};
