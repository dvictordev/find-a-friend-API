import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-org-repository";
import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists-error";
import { CreateOrgUseCase } from "../../../use-cases/org/create";

export async function createController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createOrgBodySchema = z.object({
    address: z.string(),
    city: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { address, city, email, name, password, phone } =
    createOrgBodySchema.parse(request.body);

  try {
    const orgRepository = new PrismaOrgRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgRepository);

    await createOrgUseCase.execute({
      address,
      city,
      email,
      name,
      password,
      phone,
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
