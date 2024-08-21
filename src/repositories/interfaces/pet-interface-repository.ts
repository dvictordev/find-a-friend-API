import { Pet, Prisma } from "@prisma/client";

export interface PetRepositoryInterface {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
