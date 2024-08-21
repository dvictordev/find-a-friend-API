import { Org, Pet, Prisma, Sex } from "@prisma/client";

export interface SearchPetFilterProps {
  color?: string;
  race?: string;
  sex?: Sex;
  specie?: string;
  age?: number;
  size?: string;
  city: string;
}

export interface PetRepositoryInterface {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  search(data: SearchPetFilterProps): Promise<Pet[]>;
}
