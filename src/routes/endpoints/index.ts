import { ServerRoute } from "@hapi/hapi";
const baseUri = "/api/v1/notes";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../../controllers/noteController";

const routes: ServerRoute[] = [
  {
    path: baseUri + "",
    method: "POST",
    handler: createNote,
  },
  {
    path: baseUri + "",
    method: "GET",
    handler: getAllNotes,
  },
  {
    path: baseUri + "/{id}",
    method: "GET",
    handler: getNoteById,
  },
  {
    path: baseUri + "/{id}",
    method: "PUT",
    handler: updateNote,
  },
  {
    path: baseUri + "/{id}",
    method: "DELETE",
    handler: deleteNote,
  },
];

export default routes;
