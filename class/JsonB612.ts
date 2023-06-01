import fs from 'fs';
import { dataInterfaces } from '../interfaces/dataInterfaces';
import { Radar } from '../models/Radar';
import { FlashRadar } from '../models/FlashRadar';

export class JsonB612 implements dataInterfaces {
  getData(): Radar[] {
    try {
      const data = fs.readFileSync('../datas/B612.json', 'utf8');
      const jsonData: any = JSON.parse(data);

      const radarList: Radar[] = [];

      let flashRadar: FlashRadar[] = [];
      jsonData.reports.forEach((reports: any) => {
        flashRadar.push(
          new FlashRadar(
            reports.licensePlate,
            null,
            null,
            reports.speed,
            reports.date,
            reports.evidenceUrl
          )
        );
      });
      const radar = new Radar(
        jsonData.name,
        jsonData.localisation,
        flashRadar,
        null
      );
      radarList.push(radar);

      return radarList;
    } catch (error) {
      // Gérer les erreurs
      throw new Error("Une erreur s'est produite.");
    }
  }
}
