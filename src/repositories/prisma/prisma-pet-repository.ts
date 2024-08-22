import { Prisma, Pet } from "@prisma/client";
import {
  PetRepositoryInterface,
  SearchPetFilterProps,
} from "../interfaces/pet-interface-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetRepository implements PetRepositoryInterface {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
  async search(data: SearchPetFilterProps): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: data.age,
        color: data.color,
        race: data.race,
        sex: data.sex,
        size: data.size,
        specie: data.specie,
        org: {
          city: {
            contains: data.city,
            mode: "insensitive",
          },
        },
      },
    });

    return pets;
  }
  async serchById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
}
