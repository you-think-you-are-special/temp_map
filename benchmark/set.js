const Benchmark = require('benchmark');
const { TempMap } = require('../src/temp_map');

let tmp;
const suite = new Benchmark.Suite('TempMap#set', {
  onCycle: function () {
    tmp = new TempMap();
  }
});


suite
  .add('set 2000', function () {
    tmp.set('key', 'value', 2000)
  })
  .add('set 2000', function () {
    tmp.set('key', 'value', 2000)
  })
  .add('set 5000', function () {
    tmp.set('key', 'value', 5000)
  })
  .add('set 5000', function () {
    tmp.set('key', 'value', 10000)
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });