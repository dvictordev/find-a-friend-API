import { Prisma, Pet } from "@prisma/client";
import { PetRepositoryInterface } from "../interfaces/pet-interface-repository";

export class PrismaPetRepository implements PetRepositoryInterface {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    throw new Error("Method not implemented.");
  }
}
