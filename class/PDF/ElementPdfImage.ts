import { AbstractElementPdf } from './AbstractElementPdf';

export class ElementPdfImage extends AbstractElementPdf {
  private image: string;

  constructor(x: number, y: number, image: string) {
    super(x, y);
    this.image = image;
  }

  public getImage(): string {
    return this.image;
  }
}
