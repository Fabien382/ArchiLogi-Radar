import { dataInterfaces } from '../../interfaces/dataInterfaces';
import { FlashRadar } from '../../models/FlashRadar';
import { Radar } from '../../models/Radar';
import { JsonAwesomeRadar } from './JsonAwesomeRadar';
import { JsonB612 } from './JsonB612';
import { Reporter2000 } from './Reporter2000';



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
}
