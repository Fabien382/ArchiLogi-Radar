import { FlashRadar } from './FlashRadar';

export class Radar {
  private name: string | null;
  private localisation: string | null;
  private speedThreshold: Number | null;
  private flash: FlashRadar[];

  constructor(
    name: string | null,
    localisation: string | null,
    flash: FlashRadar[],
    speedThreshold: Number | null
  ) {
    this.name = name;
    this.localisation = localisation;
    this.flash = flash;
    this.speedThreshold = speedThreshold;
  }

  public getFlash(): FlashRadar[] {
    return this.flash
  }
}
