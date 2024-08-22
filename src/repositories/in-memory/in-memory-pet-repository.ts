import { Prisma, Pet } from "@prisma/client";
import {
  PetRepositoryInterface,
  SearchPetFilterProps,
} from "../interfaces/pet-interface-repository";
import { randomUUID } from "crypto";
import { InMemoryOrgRepository } from "./in-memory-org-repository";

export class InMemoryPetRepository implements PetRepositoryInterface {
  constructor(private orgsRepository: InMemoryOrgRepository) {}

  public pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      ...data,
      id: randomUUID(),
    };

    this.pets.push(pet);

    return pet;
  }

  async search(data: SearchPetFilterProps): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.org.filter((org) => {
      return (org.city = data.city);
    });

    const pets = this.pets
      .filter((item) => orgsByCity.some((org) => org.id === item.orgId))
      .filter((item) => {
        return data.age ? item.age === data.age : true;
      })
      .filter((item) => {
        return data.size ? item.size === data.size : true;
      })
      .filter((item) => {
        return data.color
          ? item.color.toLowerCase() === data.color.toLowerCase()
          : true;
      })
      .filter((item) => {
        return data.race
          ? item.race.toLowerCase() === data.race.toLowerCase()
          : true;
      })
      .filter((item) => {
        return data.sex
          ? item.sex.toLowerCase() === data.sex.toLowerCase()
          : true;
      })
      .filter((item) => {
        return data.specie
          ? item.specie.toLowerCase() === data.specie.toLowerCase()
          : true;
      });

    return pets;
  }

  async serchById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id == id);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
