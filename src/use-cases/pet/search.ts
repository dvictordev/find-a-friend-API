import { Sex } from "@prisma/client";
import { PetRepositoryInterface } from "../../repositories/interfaces/pet-interface-repository";
import { OrgRepositoryInterface } from "../../repositories/interfaces/org-interface-repository";

interface PetFilterProps {
  color?: string;
  race?: string;
  sex?: Sex;
  specie?: string;
  age?: number;
  size?: string;
  city: string;
}

export class SearchUsecase {
  constructor(private petRepository: PetRepositoryInterface) {}
  async execute({ city, age, color, race, sex, size, specie }: PetFilterProps) {
    const pets = await this.petRepository.search({
      city,
      age,
      color,
      race,
      sex,
      size,
      specie,
    });

    return pets;
  }
}
