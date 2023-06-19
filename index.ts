import { ExtractDataRadar } from './class/ExtractDatas/ExtractDataRadar';
import { FlashRadar } from './models/FlashRadar';
import { Radar } from './models/Radar';
import { CreatePdf } from './class/PDF/CreatePdf';
// import * as fs from 'fs';

// choice of the date
const dateDonnee: Date = new Date('2023-01-01');

// extract data
let extractDataRadar: ExtractDataRadar = new ExtractDataRadar();
let radar: Radar[] = extractDataRadar.getData();

// get flash on date choose
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

CreatePdf.createPdf();
