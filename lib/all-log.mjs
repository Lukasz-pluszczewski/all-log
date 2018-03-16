import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNaN from 'lodash/isNaN';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isSymbol from 'lodash/isSymbol';
import isMap from 'lodash/isMap';
import isWeakMap from 'lodash/isWeakMap';
import isSet from 'lodash/isSet';
import isWeakSet from 'lodash/isWeakSet';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import isRegExp from 'lodash/isRegExp';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import times from 'lodash/times';
import entries from 'lodash/entries';
import fromPairs from 'lodash/fromPairs';
import size from 'lodash/size';
import path from 'path';
import chalk from 'chalk';

var ITERABLE_OPTIONS = {
  array: {
    keyQuotation: '',
    openingBrackets: '[',
    closingBrackets: ']',
    type: '',
    showKey: true
  },
  object: {
    keyQuotation: '\'',
    openingBrackets: '{',
    closingBrackets: '}',
    type: '',
    showKey: true
  },
  map: {
    keyQuotation: '\'',
    openingBrackets: '{',
    closingBrackets: '}',
    type: 'Map',
    showKey: true
  },
  weakMap: {
    keyQuotation: '\'',
    openingBrackets: '{',
    closingBrackets: '}',
    type: 'WeakMap',
    showKey: true
  },
  set: {
    keyQuotation: '',
    openingBrackets: '[',
    closingBrackets: ']',
    type: 'Set',
    showKey: false
  },
  weakSet: {
    keyQuotation: '',
    openingBrackets: '[',
    closingBrackets: ']',
    type: 'WeakSet',
    showKey: false
  }
};

var LEVEL_PADDING = 4;
var INDENTATION_SPACES_REGEX = /^[ ]*/;
var STACKTRACE_PATH_REGEX = /(\/.+?):(\d+):(\d)/;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();











var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var getSpaces = function getSpaces(numberOfSpaces) {
  return times(numberOfSpaces, function () {
    return ' ';
  }).join('');
};

var indent = function indent(numberOfSpaces) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var spaces = getSpaces(numberOfSpaces);
    if (force) {
      var minimalIndentation = reduce(value.split('\n'), function (minimalIndentation, line) {
        if (!line || !line.replace(' ', '')) {
          return minimalIndentation;
        }
        var indentation = INDENTATION_SPACES_REGEX.exec(line)[0].split('').length;
        if (minimalIndentation === null || minimalIndentation > indentation) {
          return indentation;
        }
        return minimalIndentation;
      }, null);
      return '' + value.replace(new RegExp('^' + getSpaces(minimalIndentation), 'gm'), spaces);
    }
    return '' + value.replace(/^/gm, spaces);
  };
};

var getNumberOfSpacesByLevel = function getNumberOfSpacesByLevel(level) {
  return (level + 1) * LEVEL_PADDING;
};

var getPadding = function getPadding(level) {
  return getSpaces(getNumberOfSpacesByLevel(level));
};

var getPrimitiveValue = function getPrimitiveValue(value, level, noPaddingOnZeroLevel) {
  if (isUndefined(value)) {
    return 'undefined';
  }
  if (isNull(value)) {
    return 'null';
  }
  if (isNaN(value)) {
    return 'NaN';
  }
  if (isString(value)) {
    return '\'' + value + '\'';
  }
  if (isNumber(value)) {
    return '' + value;
  }
  if (isFunction(value)) {
    var padding = !(noPaddingOnZeroLevel && level <= 0);

    var _value$toString$split = value.toString().split('\n'),
        _value$toString$split2 = toArray(_value$toString$split),
        firstLine = _value$toString$split2[0],
        restLines = _value$toString$split2.slice(1);

    var intendFunc = indent(padding ? getNumberOfSpacesByLevel(level + 1) : 0, true);
    var funcString = [intendFunc(firstLine), intendFunc(restLines.join('\n'))].join('\n');
    return '' + (padding ? '\n' : '') + funcString + (padding ? '\n' : '');
  }
  if (isSymbol(value) || isRegExp(value)) {
    return value.toString();
  }
  return value;
};

var getIterable = function getIterable(value) {
  if (isArray(value)) {
    return _extends({}, ITERABLE_OPTIONS.array, {
      iterable: value
    });
  } else if (isPlainObject(value)) {
    return _extends({}, ITERABLE_OPTIONS.object, {
      iterable: value
    });
  } else if (isMap(value)) {
    return _extends({}, ITERABLE_OPTIONS.map, {
      iterable: fromPairs(entries(value))
    });
  } else if (isWeakMap(value)) {
    // I din't figure out how to iterate over weakMap instance
    return _extends({}, ITERABLE_OPTIONS.weakMap, {
      iterable: false
    });
  } else if (isSet(value)) {
    return _extends({}, ITERABLE_OPTIONS.set, {
      iterable: entries(value).map(function (el) {
        return el[0];
      })
    });
  } else if (isWeakSet(value)) {
    // I din't figure out how to iterate over weakSet instance
    return _extends({}, ITERABLE_OPTIONS.weakSet, {
      iterable: false
    });
  }

  return false;
};

var getString = function getString(value) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var dumpedText = '';
  var iterable = getIterable(value);

  if (iterable) {
    if (!iterable.iterable) {
      dumpedText += (iterable.type ? '[' + iterable.type + ']' : '') + '\n';
    } else if (!size(iterable.iterable)) {
      dumpedText += '' + (iterable.type ? '[' + iterable.type + '] ' : '') + iterable.openingBrackets + iterable.closingBrackets + '\n';
    } else {
      dumpedText += '' + (iterable.type ? '[' + iterable.type + '] ' : '') + iterable.openingBrackets + '\n';
      forEach(iterable.iterable, function (subValue, key) {
        var subIterable = getIterable(subValue);
        if (subIterable) {
          dumpedText += getPadding(level) + ('' + iterable.keyQuotation + key + iterable.keyQuotation + ': ');
          dumpedText += getString(subValue, level + 1);
        } else {
          dumpedText += '' + getPadding(level) + iterable.keyQuotation + key + iterable.keyQuotation + ': ' + getPrimitiveValue(subValue, level) + '\n';
        }
      });
      dumpedText += '' + getPadding(level - 1) + iterable.closingBrackets + '\n';
    }
  } else {
    dumpedText = '' + getPrimitiveValue(value, level, true) + (level ? '' : '\n');
  }
  return dumpedText;
};

var getCaller = function getCaller() {
  var error = new Error();
  var callerPath = error.stack.split('\n')[3];
  var stackMatch = STACKTRACE_PATH_REGEX.exec(callerPath);
  if (stackMatch) {
    var _stackMatch = slicedToArray(stackMatch, 4),
        match = _stackMatch[0],
        absoluteCallerPath = _stackMatch[1],
        callerLine = _stackMatch[2],
        callerColumn = _stackMatch[3];

    var relativeCallerPath = process.cwd() ? path.relative(process.cwd(), absoluteCallerPath) : absoluteCallerPath;
    return { match: match, absoluteCallerPath: absoluteCallerPath, callerLine: callerLine, callerColumn: callerColumn, relativeCallerPath: relativeCallerPath };
  }
  return false;
};

var log = function log() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var caller = getCaller();
  console.log(caller && chalk.gray.underline(caller.relativeCallerPath + ':' + caller.callerLine + ':' + caller.callerColumn + '\n')); // eslint-disable-line no-console
  var stringifiedValues = args.map(function (arg) {
    return getString(arg);
  });
  return console.log(stringifiedValues.join('\n')); // eslint-disable-line no-console
};

export { getString };
export default log;
//# sourceMappingURL=all-log.mjs.map
