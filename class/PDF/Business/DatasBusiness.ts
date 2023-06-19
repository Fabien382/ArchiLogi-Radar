import { Radar } from '../../../models/Radar';
import { ExtractDataRadar } from '../../ExtractDatas/ExtractDataRadar';
import { AbstractElementPdf } from '../AbstractElementPdf';
import { ElementPdfImage } from '../ElementPdfImage';
import { ElementPdfTxt } from '../ElementPdfTxt';

export class DatasBusiness {
  constructor() {}

  getDatas(width: number, height: number, date: Date): AbstractElementPdf[] {
    const dataRadar: ExtractDataRadar = new ExtractDataRadar();
    const data: Radar[] = dataRadar.getDataByDate(date);

    let datasForPdf: AbstractElementPdf[] = [];
    const title: ElementPdfTxt = new ElementPdfTxt(
      width / 2 - 60,
      height - 4 * 30,
      'Incidents',
      30,
      '#000000'
    );
    datasForPdf.push(title);

    const logo: ElementPdfImage = new ElementPdfImage(
      0,
      height - 300,
      'https://upload.wikimedia.org/wikipedia/fr/thumb/3/38/Logo_de_la_R%C3%A9publique_fran%C3%A7aise_%281999%29.svg/2560px-Logo_de_la_R%C3%A9publique_fran%C3%A7aise_%281999%29.svg.png'
    );

    datasForPdf.push(logo);

    return datasForPdf;
  }
}
