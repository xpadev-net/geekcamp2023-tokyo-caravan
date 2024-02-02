class KeyboardHandler {
  private text:string[];
  private offset: number;
  constructor(text: string[]) {
    this.text = text;
    this.offset = 0;
  }
  setText(text:string[]) {
    this.text = text;
    this.offset = 0;
  }
  handleKeyDown(event:KeyboardEvent) {
    const key = event.key;
    if (key.length > 1) {
      return {
        success: false,
        completed: false,
        ignore: true,
      }
    }
    for (const text of this.text) {
      if (text.startsWith(key)) {
        if (text.length === 1) {
          return {
            success: true,
            completed: false,
            ignore: true,
          }
        }
        this.text = this.text.filter((t) => t.startsWith(key)).map((t)=>t.slice(1));
        return {
          success: true,
          completed: false,
          ignore: false,
        };
      }
    }
    return {
      success: false,
      completed: false,
      ignore: false,
    }
  }
}

export {KeyboardHandler};
