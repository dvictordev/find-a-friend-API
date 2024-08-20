import { FastifyInstance } from "fastify";
import { app } from "../../../app";
import { createController } from "./create.controller";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/org", createController);
}
