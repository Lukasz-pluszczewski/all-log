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

import {
  STACKTRACE_PATH_REGEX,
  LEVEL_PADDING,
  INDENTATION_SPACES_REGEX,
  ITERABLE_OPTIONS,
  ERROR_MESSAGES,
} from './config';

const getSpaces = numberOfSpaces => times(numberOfSpaces, () => ' ').join('');

const indent = (numberOfSpaces, force = false) => (value = '') => {
  const spaces = getSpaces(numberOfSpaces);
  if (force) {
    const minimalIndentation = reduce(value.split('\n'), (minimalIndentation, line) => {
      if (!line || !line.replace(' ', '')) {
        return minimalIndentation;
      }
      const indentation = INDENTATION_SPACES_REGEX.exec(line)[0].split('').length;
      if (minimalIndentation === null || minimalIndentation > indentation) {
        return indentation;
      }
      return minimalIndentation;
    }, null);
    return `${value.replace(new RegExp(`^${getSpaces(minimalIndentation)}`, 'gm'), spaces)}`;
  }
  return `${value.replace(/^/gm, spaces)}`;
};

const getNumberOfSpacesByLevel = level => (level + 1) * LEVEL_PADDING;

const getPadding = level => getSpaces(getNumberOfSpacesByLevel(level));

const getPrimitiveValue = (value, level, noPaddingOnZeroLevel) => {
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
    return `'${value}'`;
  }
  if (isNumber(value)) {
    return `${value}`;
  }
  if (isFunction(value)) {
    const padding = !(noPaddingOnZeroLevel && level <= 0);
    const [firstLine, ...restLines] = value.toString().split('\n');
    const intendFunc = indent(padding ? getNumberOfSpacesByLevel(level + 1) : 0, true);
    const funcString = [intendFunc(firstLine), intendFunc(restLines.join('\n'))].join('\n');
    return `${padding ? '\n' : ''}${funcString}${padding ? '\n' : ''}`;
  }
  if (isSymbol(value) || isRegExp(value)) {
    return value.toString();
  }
  return value;
};

const getIterable = value => {
  if (isArray(value)) {
    return {
      ...ITERABLE_OPTIONS.array,
      iterable: value,
    };
  } else if (isPlainObject(value)) {
    return {
      ...ITERABLE_OPTIONS.object,
      iterable: value,
    };
  } else if (isMap(value)) {
    return {
      ...ITERABLE_OPTIONS.map,
      iterable: fromPairs(entries(value)),
    };
  } else if (isWeakMap(value)) {
    // I din't figure out how to iterate over weakMap instance
    return {
      ...ITERABLE_OPTIONS.weakMap,
      iterable: false,
    };
  } else if (isSet(value)) {
    return {
      ...ITERABLE_OPTIONS.set,
      iterable: entries(value).map(el => el[0]),
    };
  } else if (isWeakSet(value)) {
    // I din't figure out how to iterate over weakSet instance
    return {
      ...ITERABLE_OPTIONS.weakSet,
      iterable: false,
    };
  }

  return false;
};

export const getString = (value, level = 0) => {
  let dumpedText = '';
  const iterable = getIterable(value);

  if (iterable) {
    if (!iterable.iterable) {
      dumpedText += `${iterable.type ? `[${iterable.type}]` : ''}\n`;
    } else if (!size(iterable.iterable)) {
      dumpedText += `${iterable.type ? `[${iterable.type}] ` : ''}${iterable.openingBrackets}${iterable.closingBrackets}\n`;
    } else {
      dumpedText += `${iterable.type ? `[${iterable.type}] ` : ''}${iterable.openingBrackets}\n`;
      forEach(iterable.iterable, (subValue, key) => {
        const subIterable = getIterable(subValue);
        if (subIterable) {
          dumpedText += getPadding(level) + `${iterable.keyQuotation}${key}${iterable.keyQuotation}: `;
          dumpedText += getString(subValue, level + 1);
        } else {
          dumpedText += `${getPadding(level)}${iterable.keyQuotation}${key}${iterable.keyQuotation}: ${getPrimitiveValue(subValue, level)}\n`;
        }
      });
      dumpedText += `${getPadding(level - 1)}${iterable.closingBrackets}\n`;
    }
  } else {
    dumpedText = `${getPrimitiveValue(value, level, true)}${level ? '' : '\n'}`;
  }
  return dumpedText;
};

const getCaller = (stackLevel = 3) => {
  const error = new Error();
  const callerPath = error.stack.split('\n')[stackLevel];
  const stackMatch = STACKTRACE_PATH_REGEX.exec(callerPath);
  if (stackMatch) {
    const [match, absoluteCallerPath, callerLine, callerColumn] = stackMatch;
    const relativeCallerPath = process.cwd() ? path.relative(process.cwd(), absoluteCallerPath) : absoluteCallerPath;
    return { match, absoluteCallerPath, callerLine, callerColumn, relativeCallerPath };
  }
  return false;
};

const log = (...args) => {
  const caller = getCaller();
  console.log(caller && chalk.gray.underline(`${caller.relativeCallerPath}:${caller.callerLine}:${caller.callerColumn}\n`)); // eslint-disable-line no-console
  const stringifiedValues = args.map(arg => getString(arg));
  return console.log(stringifiedValues.join('\n')); // eslint-disable-line no-console
};

export const getTimer = () => {
  const timers = {};
  const setGetTime = name => {
    if (!name) {
      log(ERROR_MESSAGES.timerNameRequired);
      return ERROR_MESSAGES.timerNameRequired;
    }
    if (timers[name]) {
      timers[name] = {
        ...timers[name],
        last: process.hrtime(),
        totalDuration: process.hrtime(timers[name].start),
        lastDuration: process.hrtime(timers[name].last),
      };
    } else {
      const time = process.hrtime();
      timers[name] = {
        start: time,
        last: time,
        totalDuration: null,
        lastDuration: null,
      };
    }
    return timers[name];
  };
  const formatTime = (time, humanReadable = true) => {
    if (!time) {
      return time;
    }
    const seconds = time[0];
    const miliseconds = time[1] / 1000000;
    if (humanReadable) {
      return `${seconds}s ${miliseconds}ms`;
    }
    return { s: seconds, ms: miliseconds };
  };
  const formatTimes = (times, humanReadable = true) => {
    if (!times) {
      return times;
    }
    return {
      start: formatTime(times.start, humanReadable),
      last: formatTime(times.last, humanReadable),
      totalDuration: formatTime(times.totalDuration, humanReadable),
      lastDuration: formatTime(times.lastDuration, humanReadable),
    };
  };
  const timeLog = (name, tag, ...args) => {
    console.log(chalk.blue.underline(`${name}${tag ? `:${tag}` : ''}`)); // eslint-disable-line no-console
    return console.log(args.join('\n'), '\n'); // eslint-disable-line no-console
  };

  return {
    getTime(name, humanReadable = false) {
      return formatTimes(timers[name], humanReadable);
    },
    time(name) {
      const time = setGetTime(name);
      return formatTimes(time, false);
    },
    logTime(name, tag = '') {
      const time = setGetTime(name);
      timeLog(name, tag, formatTime(time.lastDuration, true), `Total: ${formatTime(time.totalDuration, true)}`);
      return time;
    },
  };
};

export default log;
