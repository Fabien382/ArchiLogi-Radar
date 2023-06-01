import { JsonAwesomeRadar } from './class/JsonAwesomeRadar';
import { JsonB612 } from './class/JsonB612';
import { Reporter2000 } from './class/Reporter2000';
import { dataInterfaces } from './interfaces/dataInterfaces';
import { FlashRadar } from './models/FlashRadar';
import { Radar } from './models/Radar';

const dateDonnee: Date = new Date('2023-01-01');

const awesomeRadar: dataInterfaces = new JsonAwesomeRadar();
const jsonB612: dataInterfaces = new JsonB612();
const reporter2000: dataInterfaces = new Reporter2000();

let radar: Radar[] = [
  ...awesomeRadar.getData(),
  ...jsonB612.getData(),
  ...reporter2000.getData(),
];

let flashOfTheDay: FlashRadar[] = [];
radar.forEach((element: Radar) => {
  element.getFlash()?.forEach((flash: FlashRadar) => {
    const flashDate: Date | null = flash.getDate();
    if (flashDate instanceof Date) {
      if (flashDate.setHours(0, 0, 0, 0) === dateDonnee.setHours(0, 0, 0, 0)) {
        flashOfTheDay.push(flash);
      }
    }
  });
});
console.log(flashOfTheDay);
