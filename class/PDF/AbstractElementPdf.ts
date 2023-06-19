export abstract class AbstractElementPdf {
  private x: number | null;
  private y: number | null;

  constructor(x: number | null, y: number | null) {
    this.x = x;
    this.y = y;
  }

  public getX(): number | null {
    return this.x;
  }

  public getY(): number | null {
    return this.y;
  }
}
