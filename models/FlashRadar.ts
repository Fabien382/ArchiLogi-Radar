export class FlashRadar {
  private license: string | null;
  private type: string | null;
  private brand: string | null;
  private speed: string | null;
  private date: Date | null;
  private imageUrl: string | null;

  constructor(
    license: string | null,
    type: string | null,
    brand: string | null,
    speed: string | null,
    date: Date | null,
    imageUrl: string | null
  ) {
    this.license = license;
    this.type = type;
    this.brand = brand;
    this.speed = speed;
    this.date = date;
    this.imageUrl = imageUrl;
  }

  public getDate(): Date | null {
    return this.date;
  }
}
