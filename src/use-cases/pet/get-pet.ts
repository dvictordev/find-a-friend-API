import { PetRepositoryInterface } from "../../repositories/interfaces/pet-interface-repository";

export class GetPetUseCase {
  constructor(private petRepository: PetRepositoryInterface) {}
  async execute(id: string) {
    const pets = await this.petRepository.serchById(id);

    return pets;
  }
}
