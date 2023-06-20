import { RadarAndIncidentsInterfaces } from '../../interfaces/RadarAndIncidentsInterfaces';
import { FlashRadar } from '../../models/FlashRadar';
import { Radar } from '../../models/Radar';
import { JsonAwesomeRadar } from './JsonAwesomeRadar';
import { JsonB612 } from './JsonB612';
import { Reporter2000 } from './Reporter2000';
import _ from 'lodash';

export class ExtractRadarIncidents {
  private radarSources: RadarAndIncidentsInterfaces[];

  constructor() {
    this.radarSources = [
      new JsonAwesomeRadar(),
      new JsonB612(),
      new Reporter2000(),
    ];
  }

  public getRadarAndIncidents(): Radar[] {
    const radarData: Radar[] = this.radarSources.flatMap((source) =>
      source.getRadarAndIncidents()
    );
    return radarData;
  }

  public getRadarAndIncidentsByDate(date: Date): Radar[] {
    const radarData: Radar[] = this.getRadarAndIncidents();
    radarData
      .flatMap((radar) => radar.getFlash() ?? [])
      .filter((flash) => {
        const flashDate = flash.getDate();
        return flashDate instanceof Date && this.isSameDay(flashDate, date);
      });

    return radarData;
  }

  public groupFlashRadarByDate(): Map<string, FlashRadar[]> {
    const radarData: Radar[] = this.getRadarAndIncidents();
    const groupedData: Map<string, FlashRadar[]> = new Map();

    radarData
      .flatMap((radar) => radar.getFlash() ?? [])
      .forEach((flash) => {
        const date = flash.getDate();
        if (date) {
          const formattedDate = this.formatDate(date);
          const existingData = groupedData.get(formattedDate);
          if (existingData) {
            groupedData.set(formattedDate, [...existingData, flash]);
          } else {
            groupedData.set(formattedDate, [flash]);
          }
        }
      });

    return groupedData;
  }

  public formatDate(date: Date): string {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();

    return `${this.padZero(day)}-${this.padZero(month)}-${year}`;
  }

  public padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  public getFlashRadarByMonthAndYear(
    month: number,
    year: number
  ): FlashRadar[] {
    const radarData: Radar[] = this.getRadarAndIncidents();
    const filteredData: FlashRadar[] = radarData
      .flatMap((radar) => radar.getFlash() ?? [])
      .filter((flash) => flash.getDate() !== null);

    return filteredData;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0);
  }
}
