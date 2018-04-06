export class Quote {
  ID: number;
  title: string;
  content: string;
  link: string;

  constructor() {
  }
  set(ID: number, title: string, content: string, link: string) {
    this.ID = ID;
    this.title = title;
    this.content = content;
    this.link = link;
  }
}