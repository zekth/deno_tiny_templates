export interface TemplateOptions {
  openBracket: string;
  closeBracket: string;
  debug?: boolean;
}

export class Template {
  template: string;
  tLen: number;
  options: TemplateOptions;
  constructor(
    template: string,
    opts: TemplateOptions = {
      openBracket: "{{",
      closeBracket: "}}",
      debug: false
    }
  ) {
    // TODO ensure template is correct
    this.template = template;
    this.tLen = template.length;
    this.options = opts;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getProperty(src: any, path: string): string {
    let out = src;
    for (const p of path.split(".")) {
      out = out[p];
    }
    return out;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public render(src: any): string {
    const out = [];
    const acc = [];
    const capture = [];
    let openned = false;
    let i = 0;
    while (i < this.tLen) {
      if (!openned) {
        acc.push(this.template[i]);
      } else {
        capture.push(this.template[i]);
      }

      if (!openned && acc.length > this.options.openBracket.length) {
        out.push(acc.shift());
      }

      const j = acc.join("");
      if (!openned && j === this.options.openBracket) {
        openned = true;
        acc.length = 0;
      } else if (
        openned &&
        capture
          .slice(
            capture.length - this.options.closeBracket.length,
            capture.length
          )
          .join("") === this.options.closeBracket
      ) {
        openned = false;
        const toRender = capture
          .slice(0, capture.length - this.options.closeBracket.length)
          .join("")
          .trim();
        const r = this.getProperty(src, toRender);
        if (r) {
          out.push(r);
        } else if (this.options.debug) {
          out.push(`## Property ${toRender} no found ##`);
        }
        capture.length = 0;
      }
      i++;
    }
    if (acc.length !== 0) {
      out.push(acc.join(""));
    }
    return out.join("");
  }
}
