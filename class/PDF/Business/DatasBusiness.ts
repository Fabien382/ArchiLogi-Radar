import { Radar } from '../../../models/Radar';
import { ExtractDataRadar } from '../../ExtractDatas/ExtractDataRadar';
import { AbstractElementPdf } from '../AbstractElementPdf';
import { ElementPdfImage } from '../ElementPdfImage';
import { ElementPdfTxt } from '../ElementPdfTxt';

export class DatasBusiness {
  constructor() {}

  getDatas(width: number, height: number, date: Date): AbstractElementPdf[] {
    const dataRadar: ExtractDataRadar = new ExtractDataRadar();
    const data: Radar[] = dataRadar.getData();

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

    return datasForPdf;
  }
}
