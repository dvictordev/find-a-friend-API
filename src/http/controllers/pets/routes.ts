import { FastifyInstance } from "fastify";
import { createPetController } from "./create.controller";

export async function petRoutes(app: FastifyInstance) {
  app.post("/pet", createPetController);
}
