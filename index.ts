import { ExtractDataRadar } from './class/ExtractDatas/ExtractDataRadar';
import { FlashRadar } from './models/FlashRadar';
import { Radar } from './models/Radar';
import { CreatePdf } from './class/PDF/CreatePdf';
// import * as fs from 'fs';

// choice of the date
const date: Date = new Date('2023-01-01');

// extract data
let extractDataRadar: ExtractDataRadar = new ExtractDataRadar();

// get flash on date choose
let flashOfTheDay: Radar[] = extractDataRadar.getDataByDate(date);
console.log(flashOfTheDay);

CreatePdf.createPdf(date);
