import { AbstractElementPdf } from './AbstractElementPdf';

export class ElementPdfTxt extends AbstractElementPdf {
  private text: string;
  private size: number | null;
  private color: string | null;

  constructor(
    x: number,
    y: number,
    text: string,
    size: number | null,
    color: string | null
  ) {
    super(x, y);
    this.text = text;
    this.size = size;
    this.color = color;
  }

  public getText(): string {
    return this.text;
  }

  public getSize(): number | null {
    return this.size;
  }

  public getColor(): string | null {
    return this.color;
  }
}
