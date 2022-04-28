import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import Controller from '@ember/controller';
import { later } from '@ember/runloop';

export default class ApplicationController extends Controller {
  @tracked shallow = {
    a: 1,
    b: {
      x: 1,
    },
    c: [1, 2, 3],
    @tracked t: 1,
  };

  @deepTracked deep = {
    a: 1,
    b: {
      x: 1,
    },
    c: [1, 2, 3],
    t: 1,
  };

  interval = 250;
  onTimer() {
    this.inc(this.shallow);
    this.inc(this.deep);
    later(this, this.onTimer, this.interval);
  }

  inc(thing) {
    thing.a++;
    thing.b.x++;
    thing.c.forEach((value, i, array) => (array[i] = value + 1));
    thing.t++;
  }

  constructor(...args) {
    super(...args);
    this.onTimer();
  }
}
