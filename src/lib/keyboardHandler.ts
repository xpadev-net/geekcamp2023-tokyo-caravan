import {ArrayEqual} from "@/lib/array";

type ParsedSentence = ParsedExceptedKey[];

type ParsedExceptedKey = {
  charSets: string[];
}

class KeyboardHandler {
  public sentences:ParsedSentence[];
  public offset = 0;

  constructor(text: string[]) {
    this.sentences = text.map((t)=>this.parse(t));
    this.offset = 0;
  }
  setText(text:string[]) {
    this.sentences = text.map((t)=>this.parse(t));
    this.offset = 0;
  }

  parse(text: string):ParsedSentence {
    const result:ParsedSentence = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '｛') {
        let buffer = '';
        while (i < text.length) {
          i++;
          const char = text[i];
          if (char === '｝') {
            break;
          }
          buffer += char;
        }
        result.push({charSets: this._splitKeys(buffer)});
      } else {
        result.push({charSets: [char]});
      }
    }
    return result;
  }
  private _splitKeys(text: string) {
    const tmpChars:string[] = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '「'){
        let buffer = '';
        while (i < text.length) {
          i++;
          const char = text[i];
          if (char === '」') {
            break;
          }
          buffer += char;
        }
        tmpChars.push(buffer);
      }
    }
    return tmpChars
  }

  parseKeyDown(event:KeyboardEvent) {
    const result = [event.key];
    if (event.shiftKey) {
      result.push('Shift');
    }
    if (event.ctrlKey) {
      result.push('Control');
    }
    if (event.altKey) {
      result.push('Alt');
    }
    if (event.metaKey) {
      result.push('Meta');
    }
    return result;
  }

  handleKeyDown(event:KeyboardEvent) {
    const parsedKey = this.parseKeyDown(event);

    for (const sentence of this.sentences) {
      const exceptedKey = sentence[this.offset];
      if (ArrayEqual(exceptedKey.charSets, parsedKey)) {
        if (this.offset === sentence.length -1) {
          this.offset = 0;
          return {
            completed: true,
            valid: true,
          }
        }
        this.sentences = this.sentences.filter((s) => {
          const exceptedKey = s[this.offset];
          return ArrayEqual(exceptedKey.charSets, parsedKey);
        })
        this.offset++;
        return {
          completed: false,
          valid: true,
        }
      }
    }
    return {
      completed: false,
      valid: false,
    }
  }
}

export {KeyboardHandler};
