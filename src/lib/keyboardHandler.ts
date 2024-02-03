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
    let buffer = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '｛') {
        if (buffer.length > 0) {
          result.push({charSets: this._splitKeys(buffer)});
          buffer = '';
        }
        let _buffer = '';
        while (i < text.length) {
          i++;
          const char = text[i];
          if (char === '｝') {
            break;
          }
          _buffer += char;
        }
        result.push({charSets: this._splitKeys(_buffer)});
      } else {
        buffer += char;
      }
    }
    if (buffer.length > 0) {
      result.push(...this._splitKeys(buffer).map((i)=>({charSets: [i]})));
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
        continue;
      }
      tmpChars.push(char);
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
      console.log(exceptedKey.charSets,parsedKey,ArrayEqual(exceptedKey.charSets, parsedKey));
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

  getParsedContents(){
    if (this.sentences.length === 0) {
      return undefined;
    }
    const typed = this.sentences[0].slice(0,this.offset).map((s)=>s.charSets.join('+')).join("->");
    const remaining = this.sentences.map((s)=>s.slice(this.offset).map((s)=>s.charSets.join('+')).join("->"));
    return {
      typed,
      remaining,
    }
  }

}

export {KeyboardHandler};
