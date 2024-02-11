import { Request, ResponseToolkit } from "@hapi/hapi";
import { Boom } from "@hapi/boom";
import Podium from "@hapi/podium";
import response from "../helpers/response";
import NoteService from "../services/noteService";

const noteService = new NoteService();

export async function createNote(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  try {
    const { title, body } = request.payload as { title: string; body: string };
    if (!title.trim() || !body.trim()) {
      return response(400, "Note title and body cannot be empty.");
    }

    const newNote = noteService.createNote(title, body);
    return response(201, newNote);
  } catch (error) {
    console.error(error);
    return response(400, "Note title and body cannot be empty.");
  }
}

export async function getAllNotes(
  request: Request,
  h: ResponseToolkit
): Promise<any> {
  try {
    const notes = noteService.getAllNotes();
    return response(200, notes);
  } catch (error) {
    console.error(error);
    return response(500, "Internal Server Error");
  }
}

export async function getNoteById(
  request: any,
  h: ResponseToolkit
): Promise<any> {
  try {
    const { id } = request.params;
    const note = noteService.getNoteById(parseInt(id, 10));
    if (note) {
      return response(200, note);
    } else {
      return response(404, `Note with id ${id} not found.`);
    }
  } catch (error) {
    console.error(error);
    return response(500, "Internal Server Error");
  }
}

export async function updateNote(
  request: any,
  h: ResponseToolkit
): Promise<any> {
  try {
    const { id } = request.params;
    const { newTitle, newBody } = request.payload as {
      newTitle: string;
      newBody: string;
    };
    if (!newTitle.trim() || !newBody.trim()) {
      return response(400, "New note title and body cannot be empty.");
    }

    const updatedNote = noteService.updateNote(id, newTitle, newBody);

    if (updatedNote) {
      return response(200, updatedNote);
    } else {
      return response(404, `Note with id ${id} not found.`);
    }
  } catch (error) {
    console.error(error);
    return response(500, "Internal Server Error");
  }
}

export async function deleteNote(
  request: any,
  h: ResponseToolkit
): Promise<any> {
  try {
    const { id } = request.params;
    const isDeleted = noteService.deleteNote(parseInt(id, 10));

    if (isDeleted) {
      return h.response().code(204);
    } else {
      return response(404, `Note with id ${id} not found.`);
    }
  } catch (error) {
    console.error(error);
    return response(500, "Internal Server Error");
  }
}
