import { dataInterfaces } from '../../interfaces/dataInterfaces';
import { FlashRadar } from '../../models/FlashRadar';
import { Radar } from '../../models/Radar';
import { JsonAwesomeRadar } from './JsonAwesomeRadar';
import { JsonB612 } from './JsonB612';
import { Reporter2000 } from './Reporter2000';
import _ from 'lodash';

export class ExtractDataRadar {
  public getData(): Radar[] {
    const awesomeRadar: dataInterfaces = new JsonAwesomeRadar();
    const jsonB612: dataInterfaces = new JsonB612();
    const reporter2000: dataInterfaces = new Reporter2000();

    let radar: Radar[] = [
      ...awesomeRadar.getData(),
      ...jsonB612.getData(),
      ...reporter2000.getData(),
    ];
    return radar;
  }

  public getDataByDate(date: Date): Radar[] {
    let radar: Radar[] = this.getData();
    let flashOfTheDay: FlashRadar[] = [];
    radar.forEach((element: Radar) => {
      element.getFlash()?.forEach((flash: FlashRadar) => {
        const flashDate: Date | null = flash.getDate();
        if (flashDate instanceof Date) {
          if (flashDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
            flashOfTheDay.push(flash);
          }
        }
      });
    });
  
    return radar;
  }
  public groupFlashRadarByDate(): Map<string, FlashRadar[]> {
    const radarData: Radar[] = this.getData();
    const groupedData: Map<string, FlashRadar[]> = new Map();
  
    radarData.forEach((radar: Radar) => {
      const flashData: FlashRadar[] | null = radar.getFlash();
      if (flashData) {
        flashData.forEach((flash: FlashRadar) => {
          const date: Date | null = flash.getDate();
          if (date) {
            const formattedDate: string = this.formatDate(date);
            const existingData: FlashRadar[] | undefined = groupedData.get(formattedDate);
            if (existingData) {
              groupedData.set(formattedDate, [...existingData, flash]);
              
            } else {
              groupedData.set(formattedDate, [flash]);
            }
          }
        });
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

  public getFlashRadarDataByMonthAndYear(month: number, year: number): FlashRadar[] {
    const radarData: Radar[] = this.getData();
    const filteredData: FlashRadar[] = [];
  
    radarData.forEach((radar: Radar) => {
      const flashData: FlashRadar[] | null = radar.getFlash();
  
      if (flashData) {
        flashData.forEach((flash: FlashRadar) => {
          if (flash.getDate() != null) {
            filteredData.push(flash);
          }
        });
      }
    });
  
    return filteredData;
  }

}
