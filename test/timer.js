import { expect } from 'chai';
import { getTimer } from '../src/index';

describe('timer', () => {
  it('should measure time', () => {
    const timer = getTimer();
    timer.time('test');
    let test = 0;
    timer.logTime('test', 'before');
    for (let i = 0; i < 100000; i++) {
      test = 2 * i / 5;
    }
    timer.time('test');
    timer.logTime('test', 'after');
  });
});
