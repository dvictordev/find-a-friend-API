import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { orgRoutes } from "./http/controllers/orgs/routes";
import { petRoutes } from "./http/controllers/pets/routes";
export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: "10m",
  },
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(fastifyCookie);

app.register(petRoutes);

app.register(orgRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", issues: error.format });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    //TODO: Here we should do a log to an external tool like Datadog/NewRelic/Sentry
  }

  return reply.status(500).send("Internal server error.");
});
