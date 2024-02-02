class KeyboardHandler {
  private text:string;
  private offset: number;
  constructor(text: string="") {
    this.text = text;
    this.offset = 0;
  }
  setText(text:string) {
    this.text = text;
    this.offset = 0;
  }
  handleKeyDown(event:KeyboardEvent) {
    if (event.key.length > 1) {
      return {
        success: false,
        completed: false,
        ignore: true,
      }
    }
    if (event.key === this.text.slice(this.offset, this.offset + 1)) {
      this.offset++;
      if (this.offset === this.text.length) {
        return {
          success: true,
          completed: true,
          ignore: false,
        };
      }
      return {
        success: true,
        completed: false,
        ignore: false,
      };
    }
    return {
      success: false,
      completed: false,
      ignore: false,
    }
  }
}

export {KeyboardHandler};
