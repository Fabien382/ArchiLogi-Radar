import { dataInterfaces } from '../../interfaces/dataInterfaces';
import { Radar } from '../../models/Radar';
import { FlashRadar } from '../../models/FlashRadar';
import { parseString } from 'xml2js';
import fs from 'fs';

export class Reporter2000 implements dataInterfaces {
  getData(): Radar[] {
    try {
      const xmlData = fs.readFileSync('./datas/Reporter2000.xml', 'utf8');

      let radarList: Radar[] = [];

      parseString(xmlData, (err, result) => {
        if (err) {
          throw new Error(
            "Une erreur s'est produite lors de l'analyse du fichier XML."
          );
        }

        const localisation = result.localisation.$.loc;
        const date = result.localisation.date[0].$.day;

        const flashRadar: FlashRadar[] = result.localisation.date[0].driver.map(
          (driver: any) =>
            new FlashRadar(
              driver.$.license,
              driver.$.type,
              driver.$.brand,
              driver.$.speed,
              new Date(date),
              null
            )
        );

        const radar = new Radar(null, localisation, flashRadar, null);
        radarList.push(radar);
      });

      return radarList;
    } catch (error) {
      console.error(error);
      // Gérer les erreurs
      throw new Error("Une erreur s'est produite.");
    }
  }
}
