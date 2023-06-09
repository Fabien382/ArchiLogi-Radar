import fs from 'fs';
import { RadarAndIncidentsInterfaces } from '../../interfaces/RadarAndIncidentsInterfaces';
import { Radar } from '../../models/Radar';
import { FlashRadar } from '../../models/FlashRadar';

export class JsonB612 implements RadarAndIncidentsInterfaces {
  getRadarAndIncidents(): Radar[] {
    try {
      const data = fs.readFileSync('./radarIncidents/B612.json', 'utf8');
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
            new Date(reports.date + 'T00:00:00Z'),
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
      console.error(error);
      // Gérer les erreurs
      throw new Error("Une erreur s'est produite.");
    }
  }
}
