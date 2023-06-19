export class FlashRadar {
  private license: string;
  private type: string | null;
  private brand: string | null;
  private speed: string | null;
  private date: Date;
  private imageUrl: string | null;

  constructor(
    license: string,
    type: string | null,
    brand: string | null,
    speed: string | null,
    date: Date,
    imageUrl: string | null
  ) {
    this.license = license;
    this.type = type;
    this.brand = brand;
    this.speed = speed;
    this.date = date;
    this.imageUrl = imageUrl;
  }

  public getDate(): Date  {
    return this.date;
  }
  
  public getLicense(): string {
    return this.license;
  }
}
