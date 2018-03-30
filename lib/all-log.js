(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash/isUndefined'), require('lodash/isNull'), require('lodash/isNaN'), require('lodash/isString'), require('lodash/isNumber'), require('lodash/isSymbol'), require('lodash/isMap'), require('lodash/isWeakMap'), require('lodash/isSet'), require('lodash/isWeakSet'), require('lodash/isFunction'), require('lodash/isPlainObject'), require('lodash/isArray'), require('lodash/isRegExp'), require('lodash/reduce'), require('lodash/forEach'), require('lodash/times'), require('lodash/entries'), require('lodash/fromPairs'), require('lodash/size'), require('path'), require('chalk')) :
	typeof define === 'function' && define.amd ? define(['exports', 'lodash/isUndefined', 'lodash/isNull', 'lodash/isNaN', 'lodash/isString', 'lodash/isNumber', 'lodash/isSymbol', 'lodash/isMap', 'lodash/isWeakMap', 'lodash/isSet', 'lodash/isWeakSet', 'lodash/isFunction', 'lodash/isPlainObject', 'lodash/isArray', 'lodash/isRegExp', 'lodash/reduce', 'lodash/forEach', 'lodash/times', 'lodash/entries', 'lodash/fromPairs', 'lodash/size', 'path', 'chalk'], factory) :
	(factory((global['all-log'] = {}),global.isUndefined,global.isNull,global.isNaN,global.isString,global.isNumber,global.isSymbol,global.isMap,global.isWeakMap,global.isSet,global.isWeakSet,global.isFunction,global.isPlainObject,global.isArray,global.isRegExp,global.reduce,global.forEach,global.times,global.entries,global.fromPairs,global.size,global.path,global.chalk));
}(this, (function (exports,isUndefined,isNull,isNaN,isString,isNumber,isSymbol,isMap,isWeakMap,isSet,isWeakSet,isFunction,isPlainObject,isArray,isRegExp,reduce,forEach,times,entries,fromPairs,size,path,chalk) { 'use strict';

isUndefined = isUndefined && isUndefined.hasOwnProperty('default') ? isUndefined['default'] : isUndefined;
isNull = isNull && isNull.hasOwnProperty('default') ? isNull['default'] : isNull;
isNaN = isNaN && isNaN.hasOwnProperty('default') ? isNaN['default'] : isNaN;
isString = isString && isString.hasOwnProperty('default') ? isString['default'] : isString;
isNumber = isNumber && isNumber.hasOwnProperty('default') ? isNumber['default'] : isNumber;
isSymbol = isSymbol && isSymbol.hasOwnProperty('default') ? isSymbol['default'] : isSymbol;
isMap = isMap && isMap.hasOwnProperty('default') ? isMap['default'] : isMap;
isWeakMap = isWeakMap && isWeakMap.hasOwnProperty('default') ? isWeakMap['default'] : isWeakMap;
isSet = isSet && isSet.hasOwnProperty('default') ? isSet['default'] : isSet;
isWeakSet = isWeakSet && isWeakSet.hasOwnProperty('default') ? isWeakSet['default'] : isWeakSet;
isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
isPlainObject = isPlainObject && isPlainObject.hasOwnProperty('default') ? isPlainObject['default'] : isPlainObject;
isArray = isArray && isArray.hasOwnProperty('default') ? isArray['default'] : isArray;
isRegExp = isRegExp && isRegExp.hasOwnProperty('default') ? isRegExp['default'] : isRegExp;
reduce = reduce && reduce.hasOwnProperty('default') ? reduce['default'] : reduce;
forEach = forEach && forEach.hasOwnProperty('default') ? forEach['default'] : forEach;
times = times && times.hasOwnProperty('default') ? times['default'] : times;
entries = entries && entries.hasOwnProperty('default') ? entries['default'] : entries;
fromPairs = fromPairs && fromPairs.hasOwnProperty('default') ? fromPairs['default'] : fromPairs;
size = size && size.hasOwnProperty('default') ? size['default'] : size;
path = path && path.hasOwnProperty('default') ? path['default'] : path;
chalk = chalk && chalk.hasOwnProperty('default') ? chalk['default'] : chalk;

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

var ERROR_MESSAGES = {
  timerNameRequired: 'Timer must have name to measure time'
};

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
  var stackLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

  var error = new Error();
  var callerPath = error.stack.split('\n')[stackLevel];
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

var getTimer = function getTimer() {
  var timers = {};
  var setGetTime = function setGetTime(name) {
    if (!name) {
      log(ERROR_MESSAGES.timerNameRequired);
      return ERROR_MESSAGES.timerNameRequired;
    }
    if (timers[name]) {
      timers[name] = _extends({}, timers[name], {
        last: process.hrtime(),
        totalDuration: process.hrtime(timers[name].start),
        lastDuration: process.hrtime(timers[name].last)
      });
    } else {
      var time = process.hrtime();
      timers[name] = {
        start: time,
        last: time,
        totalDuration: null,
        lastDuration: null
      };
    }
    return timers[name];
  };
  var formatTime = function formatTime(time) {
    var humanReadable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!time) {
      return time;
    }
    var seconds = time[0];
    var miliseconds = time[1] / 1000000;
    if (humanReadable) {
      return seconds + 's ' + miliseconds + 'ms';
    }
    return { s: seconds, ms: miliseconds };
  };
  var formatTimes = function formatTimes(times$$1) {
    var humanReadable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!times$$1) {
      return times$$1;
    }
    return {
      start: formatTime(times$$1.start, humanReadable),
      last: formatTime(times$$1.last, humanReadable),
      totalDuration: formatTime(times$$1.totalDuration, humanReadable),
      lastDuration: formatTime(times$$1.lastDuration, humanReadable)
    };
  };
  var timeLog = function timeLog(name, tag) {
    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    console.log(chalk.blue.underline('' + name + (tag ? ':' + tag : ''))); // eslint-disable-line no-console
    return console.log(args.join('\n'), '\n'); // eslint-disable-line no-console
  };

  return {
    getTime: function getTime(name) {
      var humanReadable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return formatTimes(timers[name], humanReadable);
    },
    time: function time(name) {
      var time = setGetTime(name);
      return formatTimes(time, false);
    },
    logTime: function logTime(name) {
      var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var time = setGetTime(name);
      timeLog(name, tag, formatTime(time.lastDuration, true), 'Total: ' + formatTime(time.totalDuration, true));
      return time;
    }
  };
};

exports.getString = getString;
exports.getTimer = getTimer;
exports['default'] = log;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=all-log.js.map
