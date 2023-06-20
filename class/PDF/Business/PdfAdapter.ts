import { FlashRadar } from '../../../models/FlashRadar';
import { ExtractRadarIncidents } from '../../ExtractRadarIncidents/ExtractRadarIncidents';
import { AbstractElementPdf } from '../AbstractElementPdf';
import { ElementPdfImage } from '../ElementPdfImage';
import { ElementPdfTxt } from '../ElementPdfTxt';

export class PdfAdapter {
  constructor() {}

  getElementsForPdf(
    width: number,
    height: number
  ): AbstractElementPdf[] {
    const dataRadar: ExtractRadarIncidents = new ExtractRadarIncidents();
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
    let nbIncidentsTotal: number = 0;

    // affiche les plaques d'immatriculation par date
    let i: number = 0;
    data.forEach((value: FlashRadar[], key: String) => {
      const nbFlashRadar = value.length;
      nbIncidentsTotal += nbFlashRadar;
      const element: ElementPdfTxt = new ElementPdfTxt(
        50,
        height - 4 * 70 - i * 50,
        key.toString() + ' - ' + nbFlashRadar + ' Incidents',
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

    const element: ElementPdfTxt = new ElementPdfTxt(
      width / 2 - 120,
      height - 4 * 70 - i * 50,
      "Nombre d'incidents total : " + nbIncidentsTotal,
      20,
      '#000000'
    );
    datasForPdf.push(element);
    return datasForPdf;
  }
}
