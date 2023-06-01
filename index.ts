// // import { JsonAwesomeRadar } from './class/JsonAwesomeRadar';
// const { JsonAwesomeRadar } = require('./class/JsonAwesomeRadar');
// const { dataInterfaces } = require('./interfaces/dataInterface');

import { JsonAwesomeRadar } from './class/JsonAwesomeRadar';
import { dataInterfaces } from './interfaces/dataInterfaces';
import { Radar } from './models/Radar';

const AwesomeRadar: dataInterfaces = new JsonAwesomeRadar();

let radar: Radar[] = AwesomeRadar.getData();
radar.forEach((element: Radar) => {
  console.log(element);
});
