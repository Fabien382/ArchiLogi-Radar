import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { DatasBusiness } from './Business/DatasBusiness';
import { AbstractElementPdf } from './AbstractElementPdf';
import { ElementPdfTxt } from './ElementPdfTxt';
import { ElementPdfImage } from './ElementPdfImage';

export class CreatePdf {
  public static async createPdf(date: Date) {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const data: DatasBusiness = new DatasBusiness();
    const dataBusiness: AbstractElementPdf[] = data.getDatas(
      width,
      height,
      date
    );

    dataBusiness.forEach((element: AbstractElementPdf) => {
      if (element instanceof ElementPdfTxt) {
        const text = element.getText();
        const x = element.getX();
        const y = element.getY();
        const size = element.getSize();
        const color = element.getColor();
        page.drawText(text, {
          x: x,
          y: y,
          size: size || 30,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
      }

      if (element instanceof ElementPdfImage) {
        const image = element.getImage();
        const x = element.getX();
        const y = element.getY();
        const pngImage = fs.readFileSync(image);
        const pngImageEmbed = await pdfDoc.embedPng(pngImage);
        page.drawImage(pngImageEmbed, {
          x: x,
          y: y,
          width: 300,
          height: 300,
        });
      }
    });
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join('pdf/output.pdf'); // Chemin vers le fichier de sortie

    fs.writeFileSync(filePath, pdfBytes);
  }
}
