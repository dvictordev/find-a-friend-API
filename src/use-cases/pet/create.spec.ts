import { describe, expect, it, beforeEach } from "vitest";
import { CreatePetUseCase } from "./create";
import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";
import { OrgInvalidError } from "../errors/org-invalid-error";
import { CreateOrgUseCase } from "../org/create";

let petRepository: InMemoryPetRepository;
let createPetUseCase: CreatePetUseCase;
let orgRepository: InMemoryOrgRepository;
let createOrgUseCase: CreateOrgUseCase;
describe("Create Pet", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    createPetUseCase = new CreatePetUseCase(petRepository, orgRepository);
    createOrgUseCase = new CreateOrgUseCase(orgRepository);
  });

  it("should be able to create a new Org", async () => {
    const { org } = await createOrgUseCase.execute({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password: "12345678",
    });

    const { pet } = await createPetUseCase.execute({
      age: 2,
      color: "black",
      race: "labrador",
      sex: "MACHO",
      size: "medio",
      specie: "cachorro",
      orgId: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.orgId).toEqual(org.id);
    expect(pet.color).toEqual("black");
  });

  it("should not be able to create a pet without a org", async () => {
    await expect(() =>
      createPetUseCase.execute({
        age: 2,
        color: "black",
        race: "labrador",
        sex: "MACHO",
        size: "medio",
        specie: "cachorro",
        orgId: "non-existent org",
      })
    ).rejects.toBeInstanceOf(OrgInvalidError);
  });
});
