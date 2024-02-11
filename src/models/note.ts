export default class Note {
  private static idCounter = 0;

  private _id: number;
  private _title: string;
  private _body: string;

  constructor(title: string, body: string) {
    this._id = ++Note.idCounter;
    this._title = title;
    this._body = body;
  }

  get id(): number {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  set title(newTitle: string) {
    this._title = newTitle;
  }

  get body(): string {
    return this._body;
  }

  set body(newBody: string) {
    this._body = newBody;
  }
}
