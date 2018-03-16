# all-log
> Util to log all kinds of stuff in a readable way in node

[![CircleCI](https://circleci.com/gh/Lukasz-pluszczewski/all-log.svg?style=svg)](https://circleci.com/gh/Lukasz-pluszczewski/all-log)

Ever struggled with `[object Object]` logs? Or maybe you logged object as JSON but got `null` in case of `undefined` and `NaN`? So did I! With this tool you can output all values as human readable string including:
- undefined
- null
- NaN
- strings
- numbers
- arrays
- objects
- symbols
- maps
- sets
- functions

NOTE: This tool works in Node only. It is especially useful if you don't use [node inspector](https://nodejs.org/en/docs/inspector/) in chrome: chrome console is much better and more user user-friendly.

NOTE2: I haven't figured out the way to iterate over WeakMap and WeakSet. If you know the way, please, let me know.

## Usage

#### Installation
```bash
npm i all-log --save-dev
```

#### Log value
You can log whatever value you want:
```javascript
import log from 'all-log';

const ma = new Map();
ma.set('dolor', 123);

log({
  foo: null,
  bar: 'baq',
  baz: undefined,
  lorem: ma,
  ipsum: () => 'dolor',
  sit: Symbol('sit'),
  arr: [
    NaN,
  ],
});
```
And you get this:

![docs/images/screenshot.png](docs/images/screenshot.png)

## FAQ
#### Why this exists?
I had enough struggle with logging strange things in Node and didn't find any library that quite suited my needs (or I did not look for it long enough ;) )

#### Are there good alternatives?
I'm absolutely sure there are: just google for a logger utility for node, or use node inspector.

#### I found a bug! What should I do?
There are at least 3 options:
1. Add an issue, write test(s) for bug you found, write fix that will make your test(s) pass, submit pull request
2. Add an issue, write test(s) for bug you found, submit pull request with you test(s)
3. Add an issue
