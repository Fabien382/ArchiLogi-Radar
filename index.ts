import { Radar } from './models/Radar';
import { CreatePdf } from './class/PDF/CreatePdf';
import { ExtractRadarIncidents } from './class/ExtractRadarIncidents/ExtractRadarIncidents';

// choice of the date
const date: Date = new Date('2023-01-01');

// extract data
let extractRadarIncidents: ExtractRadarIncidents = new ExtractRadarIncidents();

// get flash on date choose
let flashOfTheDay: Radar[] =
  extractRadarIncidents.getRadarAndIncidentsByDate(date);
console.log(flashOfTheDay);

CreatePdf.createPdf();
