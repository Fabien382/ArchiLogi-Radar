import { AbstractElementPdf } from './AbstractElementPdf';

export class ElementPdfImage extends AbstractElementPdf {
  private image: string | null;

  constructor(x: number | null, y: number | null, image: string | null) {
    super(x, y);
    this.image = image;
  }

  public getImage(): string | null {
    return this.image;
  }
}
