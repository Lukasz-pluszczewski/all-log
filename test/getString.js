import { expect } from 'chai';
import { getString } from '../src/index';

describe('getString should stringify', () => {
  it('string', () => {
    expect(getString('test')).to.be.equal(`'test'\n`);
  });
  it('undefined', () => {
    expect(getString(undefined)).to.be.equal('undefined\n'); // eslint-disable-line no-undefined
  });
  it('number', () => {
    expect(getString(123)).to.be.equal('123\n');
  });
  it('null', () => {
    expect(getString(null)).to.be.equal('null\n');
  });
  it('NaN', () => {
    expect(getString(NaN)).to.be.equal('NaN\n');
  });
  it('empty object', () => {
    expect(getString({})).to.be.equal('{}\n');
  });
  it('empty array', () => {
    expect(getString([])).to.be.equal('[]\n');
  });
  it('empty map', () => {
    expect(getString(new Map())).to.be.equal('[Map] {}\n');
  });
  it('empty set', () => {
    expect(getString(new Set())).to.be.equal('[Set] []\n');
  });
  it('map', () => {
    const map = new Map();
    map.set('key', 'value');
    expect(getString(map)).to.be.equal(`[Map] {
    'key': 'value'
}
`);
  });
  it('set', () => {
    const set = new Set();
    set.add('value');
    expect(getString(set)).to.be.equal(`[Set] [
    0: 'value'
]
`);
  });
  it('function', () => {
    expect(getString(() => 'return')).to.be.equal(`() => 'return'\n\n`);
  });

  describe('array nested', () => {
    it('string', () => {
      expect(getString(['test'])).to.be.equal(`[\n    0: 'test'\n]\n`);
    });
    it('undefined', () => {
      expect(getString([undefined])).to.be.equal('[\n    0: undefined\n]\n'); // eslint-disable-line no-undefined
    });
    it('number', () => {
      expect(getString([123])).to.be.equal('[\n    0: 123\n]\n');
    });
    it('null', () => {
      expect(getString([null])).to.be.equal('[\n    0: null\n]\n');
    });
    it('NaN', () => {
      expect(getString([NaN])).to.be.equal('[\n    0: NaN\n]\n');
    });
    it('empty object', () => {
      expect(getString([{}])).to.be.equal('[\n    0: {}\n]\n');
    });
    it('empty array', () => {
      expect(getString([[]])).to.be.equal('[\n    0: []\n]\n');
    });
    it('empty map', () => {
      expect(getString([new Map()])).to.be.equal('[\n    0: [Map] {}\n]\n');
    });
    it('empty set', () => {
      expect(getString([new Set()])).to.be.equal('[\n    0: [Set] []\n]\n');
    });
    it('map', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(getString([map])).to.be.equal(`[\n    0: [Map] {\n        'key': 'value'\n    }\n]\n`);
    });
    it('set', () => {
      const set = new Set();
      set.add('value');
      expect(getString([set])).to.be.equal(`[\n    0: [Set] [\n        0: 'value'\n    ]\n]\n`);
    });
    it('function', () => {
      expect(getString([() => 'return'])).to.be.equal(`[\n    0: \n        () => 'return'\n        \n\n]\n`);
    });
  });

  describe('object nested', () => {
    it('string', () => {
      expect(getString({ foo: 'test' })).to.be.equal(`{\n    'foo': 'test'\n}\n`);
    });
    it('undefined', () => {
      expect(getString({ foo: undefined })).to.be.equal('{\n    \'foo\': undefined\n}\n'); // eslint-disable-line no-undefined
    });
    it('number', () => {
      expect(getString({ foo: 123 })).to.be.equal('{\n    \'foo\': 123\n}\n');
    });
    it('null', () => {
      expect(getString({ foo: null })).to.be.equal('{\n    \'foo\': null\n}\n');
    });
    it('NaN', () => {
      expect(getString({ foo: NaN })).to.be.equal('{\n    \'foo\': NaN\n}\n');
    });
    it('empty object', () => {
      expect(getString({ foo: {} })).to.be.equal('{\n    \'foo\': {}\n}\n');
    });
    it('empty array', () => {
      expect(getString({ foo: [] })).to.be.equal('{\n    \'foo\': []\n}\n');
    });
    it('empty map', () => {
      expect(getString({ foo: new Map() })).to.be.equal('{\n    \'foo\': [Map] {}\n}\n');
    });
    it('empty set', () => {
      expect(getString({ foo: new Set() })).to.be.equal('{\n    \'foo\': [Set] []\n}\n');
    });
    it('map', () => {
      const map = new Map();
      map.set('key', 'value');
      expect(getString({ foo: map })).to.be.equal(`{\n    'foo': [Map] {\n        'key': 'value'\n    }\n}\n`);
    });
    it('set', () => {
      const set = new Set();
      set.add('value');
      expect(getString({ foo: set })).to.be.equal(`{\n    'foo': [Set] [\n        0: 'value'\n    ]\n}\n`);
    });
    it('function', () => {
      expect(getString({ foo: () => 'return' })).to.be.equal(`{\n    'foo': \n        () => 'return'\n        \n\n}\n`);
    });
  });
});
