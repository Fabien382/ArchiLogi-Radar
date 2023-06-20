import fs from 'fs';
import { dataInterfaces } from '../../interfaces/dataInterfaces';
import { Radar } from '../../models/Radar';
import { FlashRadar } from '../../models/FlashRadar';

export class JsonAwesomeRadar implements dataInterfaces {
  getRadarAndIncidents(): Radar[] {
    const radarList: Radar[] = [];
    try {
      const data = fs.readFileSync(
        './radarIncidents/AwesomeRadar.json',
        'utf8'
      );
      const jsonData: any = JSON.parse(data);

      let flashRadar: FlashRadar[] = [];

      jsonData.incidents.forEach((incident: [string, string]) => {
        flashRadar.push(
          new FlashRadar(
            incident[0],
            null,
            null,
            null,
            new Date(incident[1]),
            null
          )
        );
      });

      const radar = new Radar(
        null,
        jsonData.metadata.localisation,
        flashRadar,
        jsonData.metadata.speedThreshold
      );
      radarList.push(radar);
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      throw new Error("Une erreur s'est produite.");
    }

    return radarList;
  }
}
