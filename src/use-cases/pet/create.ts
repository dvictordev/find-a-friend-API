import { Prisma } from "@prisma/client";
import { PetRepositoryInterface } from "../../repositories/interfaces/pet-interface-repository";
import { OrgRepositoryInterface } from "../../repositories/interfaces/org-interface-repository";
import { OrgInvalidError } from "../errors/org-invalid-error";

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepositoryInterface,
    private orgRepository: OrgRepositoryInterface
  ) {}
  async execute(data: Prisma.PetUncheckedCreateInput) {
    const org = await this.orgRepository.findById(data.orgId);

    if (!org) {
      throw new OrgInvalidError();
    }

    const pet = await this.petRepository.create(data);

    return { pet };
  }
}
