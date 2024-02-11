import { Server, ServerOptions, ServerRoute } from "@hapi/hapi";
import config from "./config";
import routes from "./routes/endpoints";

const options: ServerOptions = {
  port: config.port,
};

const server = new Server(options);
//this goning to do the role of the midlwear using hapi
server.ext("onRequest", (request, h) => {
  const startTime = new Date();
  console.log(
    `[${startTime.toISOString()}] ${request.method.toUpperCase()} ${
      request.path
    }`
  );
  return h.continue;
});

export const init = async (): Promise<Server> => {
  server.route(routes);
  await server.initialize();
  await server.start();
  console.log("object");
  return server;
};

// funciton for starting the server
init();
