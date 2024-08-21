import { Prisma, Pet } from "@prisma/client";
import { PetRepositoryInterface } from "../interfaces/pet-interface-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepositoryInterface {
  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
    };

    this.pets.push(pet);

    return pet;
  }
}
