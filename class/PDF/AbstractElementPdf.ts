export abstract class AbstractElementPdf {
  private x: number | null;
  private y: Number | null;

  constructor(x: number | null, y: Number | null) {
    this.x = x;
    this.y = y;
  }
}
