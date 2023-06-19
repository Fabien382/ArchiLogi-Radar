import { AbstractElementPdf } from './AbstractElementPdf';

export class ElementPdfTxt extends AbstractElementPdf {
  private text: string | null;
  private taillePolice: number | null;

  constructor(
    x: number | null,
    y: number | null,
    text: string | null,
    taillePolice: number | null
  ) {
    super(x, y);
    this.text = text;
    this.taillePolice = taillePolice;
  }

  public getText(): string | null {
    return this.text;
  }
}
