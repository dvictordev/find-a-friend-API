import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrgRepository } from "../../../repositories/prisma/prisma-org-repository";
import { OrgAlreadyExistsError } from "../../../use-cases/errors/org-already-exists-error";
import { CreatePetUseCase } from "../../../use-cases/pet/create";
import { PrismaPetRepository } from "../../../repositories/prisma/prisma-pet-repository";

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();

  const orgId = request.user.sub;

  console.log(orgId);

  const createOrgBodySchema = z.object({
    age: z.number(),
    color: z.string(),
    race: z.string(),
    sex: z.string(),
    size: z.string(),
    specie: z.string(),
  });

  const { color, race, sex, size, specie, age } = createOrgBodySchema.parse(
    request.body
  );

  try {
    const petRepository = new PrismaPetRepository();
    const orgRepository = new PrismaOrgRepository();
    const createPetUseCase = new CreatePetUseCase(petRepository, orgRepository);

    await createPetUseCase.execute({
      color,
      race,
      sex: "MACHO",
      size,
      specie,
      age,
      orgId,
    });
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send();
  }

  return reply.status(201).send();
}
