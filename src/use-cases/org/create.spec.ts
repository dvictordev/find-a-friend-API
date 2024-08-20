import { describe, expect, it, beforeEach } from "vitest";
import { CreateOrgUseCase } from "./create";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";

let orgRepository: InMemoryOrgRepository;
let createOrgUseCase: CreateOrgUseCase;
describe("Create Org", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
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

    expect(org.name).toEqual("salvapets");
    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to create a org that already exists", async () => {
    await createOrgUseCase.execute({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password: "12345678",
    });

    await expect(() =>
      createOrgUseCase.execute({
        name: "salvapets",
        address: "rua fulando",
        city: "Pantano Grande",
        phone: "51999999999",
        email: "example@email.com",
        password: "12345678",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
