import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-org-repository";
import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists-error";
import { AuthenticateUseCase } from "../../../use-cases/org/authenticate";

export async function authController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = authBodySchema.parse(request.body);

  try {
    const orgRepository = new PrismaOrgRepository();
    const authUseCase = new AuthenticateUseCase(orgRepository);

    const org = await authUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({ token });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send(error);
    }

    return reply.status(500).send();
  }
}
