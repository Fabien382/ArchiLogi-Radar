import { AbstractElementPdf } from './AbstractElementPdf';

export class ElementPdfTxt extends AbstractElementPdf {
  private text: string | null;
  private size: number | null;
  private color: string | null;

  constructor(
    x: number | null,
    y: number | null,
    text: string | null,
    size: number | null,
    color: string | null
  ) {
    super(x, y);
    this.text = text;
    this.size = size;
    this.color = color;
  }

  public getText(): string | null {
    return this.text;
  }

  public getSize(): number | null {
    return this.size;
  }

  public getColor(): string | null {
    return this.color;
  }
}
