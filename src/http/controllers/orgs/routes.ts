import { FastifyInstance } from "fastify";
import { createController } from "./create.controller";
import { authController } from "./auth.controllet";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/login", authController);
  app.post("/org", createController);
}
