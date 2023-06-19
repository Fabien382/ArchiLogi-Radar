import { FlashRadar } from '../../../models/FlashRadar';
import { Radar } from '../../../models/Radar';
import { ExtractDataRadar } from '../../ExtractDatas/ExtractDataRadar';
import { AbstractElementPdf } from '../AbstractElementPdf';
import { ElementPdfImage } from '../ElementPdfImage';
import { ElementPdfTxt } from '../ElementPdfTxt';

export class DatasBusiness {
  constructor() {}

  getDatas(width: number, height: number, date: Date): AbstractElementPdf[] {
    const dataRadar: ExtractDataRadar = new ExtractDataRadar();
    const data: Map<String, FlashRadar[]> = dataRadar.groupFlashRadarByDate();

    let datasForPdf: AbstractElementPdf[] = [];
    const title: ElementPdfTxt = new ElementPdfTxt(
      width / 2 - 60,
      height - 4 * 50,
      'Incidents',
      30,
      '#000000'
    );
    datasForPdf.push(title);

    const logo: ElementPdfImage = new ElementPdfImage(
      width - 196,
      height - 110,
      'https://franceactive-occitanie.org/wp-content/uploads/2021/01/logo-etat-francais.png',
      0.5
    );
 
    datasForPdf.push(logo);


    // affiche les plaques d'immatriculation par date
    let i: number = 0;
    data.forEach((value: FlashRadar[], key: String) => {
      const nbFlashRadar = value.length;
      const element: ElementPdfTxt = new ElementPdfTxt(
        50,
        height - 4 * 70 - i * 50,
        key.toString() + " - " + nbFlashRadar + " Incidents",
        20,
        '#000000'
      );
      datasForPdf.push(element);
      i++;
      value.forEach((flashRadar: FlashRadar) => {
        const element: ElementPdfTxt = new ElementPdfTxt(
          50,
          height - 4 * 70 - i * 50,
          flashRadar.getLicense(),
          15,
          '#000000'
        );
        datasForPdf.push(element);
        i++;
      });
    });
    return datasForPdf;
  }
}
