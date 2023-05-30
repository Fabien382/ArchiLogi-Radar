class Radar {
  private name: string | null;
  private localisation: string | null;
  private speedThreshold: Number | null;
  private flash: FlashRadar | null;

  constructor(
    name: string | null,
    localisation: string | null,
    flash: FlashRadar | null,
    speedThreshold: Number | null
  ) {
    this.name = name;
    this.localisation = localisation;
    this.flash = flash;
    this.speedThreshold = speedThreshold;
  }
}
