import { Request, ResponseToolkit } from "@hapi/hapi";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import NoteService from "../services/noteService";
import { getMockReq, getMockRes } from "@jest-mock/express";
describe("Note Controller", () => {
  let mockRequest: Request;
  let mockToolkit: ResponseToolkit;
  beforeEach(() => {
    mockRequest = {} as Request;
    mockToolkit = {} as ResponseToolkit;
  });

  describe("createNote", () => {
    it("should create a new note", async () => {
      const spyCreateNote = jest.spyOn(NoteService.prototype, "createNote");

      const payload = {
        title: "Test Title",
        body: "Test Body",
      };
      const mockRequest = {
        payload,
      } as Request;
      await createNote(mockRequest, mockToolkit);

      expect(spyCreateNote).toHaveBeenCalledWith(payload.title, payload.body);
      spyCreateNote.mockRestore();
    });

    describe("getAllNotes", () => {
      it("should get all notes", async () => {
        const spyGetAllNotes = jest.spyOn(NoteService.prototype, "getAllNotes");
        const mockRequest = {} as Request;
        await getAllNotes(mockRequest, mockToolkit);
        expect(spyGetAllNotes).toHaveBeenCalled();
        spyGetAllNotes.mockRestore();
      });
    });
  });
  describe("getAllNotes", () => {
    it("should get all notes", async () => {
      const spyGetAllNotes = jest.spyOn(NoteService.prototype, "getAllNotes");
      const mockRequest = {} as Request;
      await getAllNotes(mockRequest, mockToolkit);
      expect(spyGetAllNotes).toHaveBeenCalled();
      spyGetAllNotes.mockRestore();
    });
  });
  describe("getNoteById", () => {
    it("should get a note by id", async () => {
      const spyGetNoteById = jest.spyOn(NoteService.prototype, "getNoteById");
      const req = getMockReq({ params: { id: "1" } });
      await getNoteById(req, mockToolkit);
      console.log(spyGetNoteById.mock.calls);

      expect(spyGetNoteById).toHaveBeenCalledWith(1);
      spyGetNoteById.mockRestore();
    });
  });
  describe("updateNote", () => {
    
    it("should update note", async () => {
      const spyUpdateNote = jest.spyOn(NoteService.prototype, "updateNote");
      const params = {
        id: "1",
      };
      const payload = {
        newTitle: "test", 
        newBody: "Updated Body",
      };
      const req = getMockReq({
        params: { id: "1" },
        body: payload,
      });
      try {
        await updateNote(req, mockToolkit);
      } catch (error: any) {
        expect(error.message).toEqual(
          "New note title and body cannot be empty."
        );
      }

      expect(spyUpdateNote).not.toHaveBeenCalled();
      spyUpdateNote.mockRestore();
    });

 
  });
  describe("deleteNote", () => {
    it("should delete a note by id", async () => {
      const spyDeleteNote = jest.spyOn(NoteService.prototype, "deleteNote");

      const params = {
        id: "1",
      };

      const req = getMockReq({
        params: { id: "1" },
      });
      await deleteNote(req, mockToolkit);

      expect(spyDeleteNote).toHaveBeenCalledWith(1);
      spyDeleteNote.mockRestore();
    });

    it("should handle not found error when note with given id does not exist", async () => {
      const spyDeleteNote = jest.spyOn(NoteService.prototype, "deleteNote");

      const req = getMockReq({
        params: { id: "999" },
      });
      try {
        await deleteNote(req, mockToolkit);
      } catch (error: any) {
        expect(error.message).toEqual("Note with id 999 not found.");
      }
      expect(spyDeleteNote).toHaveBeenCalledWith(999);
      spyDeleteNote.mockRestore();
    });
  });
});
