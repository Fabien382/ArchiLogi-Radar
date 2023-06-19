import { AbstractElementPdf } from './AbstractElementPdf';

export class ElementPdfImage extends AbstractElementPdf {
  private image: string;
  private scale: number;

  constructor(x: number, y: number, image: string, scale: number) {
    super(x, y);
    this.image = image;
    this.scale = scale;
  }

  public getImage(): string {
    return this.image;
  }

  public getScale(): number {
    return this.scale;
  }
}
