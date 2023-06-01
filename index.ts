// // import { JsonAwesomeRadar } from './class/JsonAwesomeRadar';
// const { JsonAwesomeRadar } = require('./class/JsonAwesomeRadar');
// const { dataInterfaces } = require('./interfaces/dataInterface');

import { JsonAwesomeRadar } from './class/JsonAwesomeRadar';
import { dataInterfaces } from './interfaces/dataInterfaces';
import { FlashRadar } from './models/FlashRadar';
import { Radar } from './models/Radar';

const test: dataInterfaces = new JsonAwesomeRadar();

console.log(test.getData());
let radar: Radar[] = test.getData();
radar.forEach((element: Radar) => {
  console.log(element);
});
