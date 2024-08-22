import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";

import { number } from "zod";
import { GetPetUseCase } from "./get-pet";

describe("Get Pet", () => {
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;
  let getPetUseCase: GetPetUseCase;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    getPetUseCase = new GetPetUseCase(petRepository);
  });

  it("should be able to get a pet by id", async () => {
    const org = await orgRepository.create({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password_hash: "12345678",
    });

    const { id } = await petRepository.create({
      age: 2,
      color: "black",
      race: "labrador",
      sex: "MACHO",
      size: "medio",
      specie: "cachorro",
      orgId: org.id,
    });

    const pet = await getPetUseCase.execute(id);

    expect(pet).toEqual(
      expect.objectContaining({
        age: 2,
        color: "black",
        race: "labrador",
        sex: "MACHO",
        size: "medio",
        specie: "cachorro",
      })
    );
  });
});
