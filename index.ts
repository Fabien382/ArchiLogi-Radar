import { ExtractDataRadar } from './class/ExtractDataRadar';
import { FlashRadar } from './models/FlashRadar';
import { Radar } from './models/Radar';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs/promises';
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
// const jsonData = JSON.stringify(flashOfTheDay);

// const filePath = './datas/extractData.json';
// const fileContent = jsonData;

// fs.writeFile(filePath, fileContent, (err) => {
//   if (err) {
//     console.error('Erreur lors de la création du fichier :', err);
//     return;
//   }

//   console.log('Le fichier a été créé avec succès !');
// });

const createPdf: Function = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  page.drawText('You can create PDFs!');
  const pdfBytes = await pdfDoc.save();

  fs.writeFile('C:\\Users\\fabie\\OneDrive\\Bureau\\output.pdf', pdfBytes);
};
createPdf();
