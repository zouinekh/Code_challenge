import Note from "../models/note";

export default class NoteService {
  private notes: Note[] = [];

  public createNote(title: string, body: string): Note {
    if (!title.trim() || !body.trim()) {
      throw new Error("Note title and body cannot be empty.");
    }
    const newNote = new Note(title, body);
    this.notes.push(newNote);
    return newNote;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  getAllNotes(): Note[] {
    return this.notes;
  }

  updateNote(id: number, newTitle: string, newBody: string): Note | undefined {
    const noteToUpdate = this.getNoteById(id);
    if (noteToUpdate) {
      noteToUpdate.title = newTitle;
      noteToUpdate.body = newBody;
    }
    return noteToUpdate;
  }

  deleteNote(id: number): boolean {
    const initialLength = this.notes.length;
    this.notes = this.notes.filter((note) => note.id !== id);
    return this.notes.length < initialLength;
  }
}
