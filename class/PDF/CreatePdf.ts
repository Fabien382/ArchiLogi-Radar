import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { PdfAdapter } from './Business/PdfAdapter';
import { AbstractElementPdf } from './AbstractElementPdf';
import { ElementPdfImage } from './ElementPdfImage';
import { ElementPdfTxt } from './ElementPdfTxt';
import axios from 'axios';

export class CreatePdf {
  public static async createPdf() {
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    this.initializePage(pdfDoc);
    const { width, height } = pdfDoc.getPages()[0].getSize();
    const elements = this.getElementsForPdf(width, height);

    for (const element of elements) {
      if (element instanceof ElementPdfTxt) {
        await this.handleTextElement(element, helveticaFont, pdfDoc);
      } else if (element instanceof ElementPdfImage) {
        await this.handleImageElement(element, pdfDoc);
      }
    }

    const pdfBytes = await pdfDoc.save();
    this.savePdfToFile(pdfBytes);
  }

  private static initializePage(pdfDoc: any) {
    pdfDoc.addPage();
  }

  private static getElementsForPdf(
    width: number,
    height: number
  ): AbstractElementPdf[] {
    return new PdfAdapter().getElementsForPdf(width, height);
  }

  private static async handleTextElement(
    element: ElementPdfTxt,
    helveticaFont: any,
    pdfDoc: any
  ) {
    const x = element.getX();
    const y = this.calculateYPosition(element, pdfDoc);
    const page = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];

    page.drawText(element.getText(), {
      x,
      y,
      size: element.getSize() || 30,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
  }

  private static calculateYPosition(element: ElementPdfTxt, pdfDoc: any) {
    const page = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
    if (element.getY() > 0) {
      return element.getY();
    }
    if (
      element.getY() <=
      0 - (pdfDoc.getPageCount() - 1) * page.getSize().height
    ) {
      this.initializePage(pdfDoc);
    }
    return element.getY() + (pdfDoc.getPageCount() - 1) * page.getSize().height;
  }

  private static async handleImageElement(
    element: ElementPdfImage,
    pdfDoc: any
  ) {
    const page = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
    try {
      const imageResponse = await axios.get(element.getImage(), {
        responseType: 'arraybuffer',
      });

      const image = await pdfDoc.embedPng(imageResponse.data);
      const scale = image.scale(element.getScale() || 1);

      page.drawImage(image, {
        x: element.getX(),
        y: element.getY(),
        width: scale.width,
        height: scale.height,
      });
    } catch (error) {
      console.log(
        "Une erreur s'est produite lors du chargement de l'image :",
        error
      );
    }
  }

  private static savePdfToFile(pdfBytes: Uint8Array) {
    const filePath = path.join('pdf/output.pdf');
    fs.writeFileSync(filePath, pdfBytes);
  }
}
