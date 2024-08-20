import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreateOrgUseCase } from "../../../use-cases/org/create";
import { InMemoryOrgRepository } from "../../../repositories/in-memory/in-memory-org-repository";

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
    const inMemoryOrgRepository = new InMemoryOrgRepository();
    const createOrgUseCase = new CreateOrgUseCase(inMemoryOrgRepository);

    await createOrgUseCase.execute({
      address,
      city,
      email,
      name,
      password,
      phone,
    });

    return reply.status(201).send();
  } catch (error) {
    return reply.status(409).send();
  }
}
