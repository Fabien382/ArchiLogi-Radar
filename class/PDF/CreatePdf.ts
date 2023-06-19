import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { DatasBusiness } from './Business/DatasBusiness';
import { AbstractElementPdf } from './AbstractElementPdf';
import { ElementPdfImage } from './ElementPdfImage';
import { ElementPdfTxt } from './ElementPdfTxt';
import axios from 'axios';

export class CreatePdf {
  public static async createPdf(date: Date) {
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let nbPage:number = 1;

    let page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const data: DatasBusiness = new DatasBusiness();
    const dataBusiness: AbstractElementPdf[] = data.getDatas(width, height, date);

    for (const element of dataBusiness) {
      if (element instanceof ElementPdfTxt) {
        const text = element.getText();
        const x = element.getX();
        let y = element.getY();
        const size = element.getSize();
        const color = element.getColor();

        // si y est supérieur à la hauteur de la page, on passe à la page suivante
        if (y <= 0) {
          if(y <= 0 - ((nbPage -1) * height)) {
            page = pdfDoc.addPage();
            nbPage += 1;
          }
          y = y +  ((nbPage -1) * height);
        }


        page.drawText(text, {
          x: x,
          y: y,
          size: size || 30,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      if (element instanceof ElementPdfImage) {
        const imageUrl = element.getImage();
        try {
          const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
          });

          const imageBytes = imageResponse.data;
          const image = await pdfDoc.embedPng(imageBytes);
          const scale = image.scale(element.getScale() || 1);
          page.drawImage(image, {
            x: element.getX(),
            y: element.getY(),
            width: scale.width,
            height: scale.height,
          });
        } catch (error) {
          console.log('Une erreur s\'est produite lors du chargement de l\'image :', error);
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const filePath = path.join('pdf/output.pdf'); // Chemin vers le fichier de sortie

    fs.writeFileSync(filePath, pdfBytes);
  }
}
