import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";

import { SearchUsecase } from "./search";
import { number } from "zod";

describe("Create Pet", () => {
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;
  let searchUsecase: SearchUsecase;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    searchUsecase = new SearchUsecase(petRepository);
  });

  it("should be able to lists pets by city", async () => {
    const org = await orgRepository.create({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password_hash: "12345678",
    });

    await petRepository.create({
      age: 2,
      color: "black",
      race: "labrador",
      sex: "MACHO",
      size: "medio",
      specie: "cachorro",
      orgId: org.id,
    });

    await petRepository.create({
      age: 2,
      color: "white",
      race: "Chiuaua",
      sex: "FEMEA",
      size: "pequeno",
      specie: "cachorro",
      orgId: org.id,
    });

    const pets = await searchUsecase.execute({
      city: "Pantano Grande",
    });

    expect(pets.length).toEqual(2);
  });

  it("should be able to lists pets by city and race", async () => {
    const org = await orgRepository.create({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password_hash: "12345678",
    });

    await petRepository.create({
      age: 2,
      color: "black",
      race: "labrador",
      sex: "MACHO",
      size: "medio",
      specie: "cachorro",
      orgId: org.id,
    });

    await petRepository.create({
      age: 2,
      color: "white",
      race: "Chiuaua",
      sex: "FEMEA",
      size: "pequeno",
      specie: "cachorro",
      orgId: org.id,
    });

    const pets = await searchUsecase.execute({
      city: "Pantano Grande",
      race: "labrador",
    });

    expect(pets.length).toEqual(1);
    expect(pets[0].race).toEqual("labrador");
  });

  it("should be able to lists pets by city and age", async () => {
    const org = await orgRepository.create({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password_hash: "12345678",
    });

    await petRepository.create({
      age: 2,
      color: "black",
      race: "labrador",
      sex: "MACHO",
      size: "medio",
      specie: "cachorro",
      orgId: org.id,
    });

    await petRepository.create({
      age: 10,
      color: "white",
      race: "Chiuaua",
      sex: "FEMEA",
      size: "pequeno",
      specie: "cachorro",
      orgId: org.id,
    });

    const pets = await searchUsecase.execute({
      city: "Pantano Grande",
      age: 10,
    });

    expect(pets).toHaveLength(1);
    expect(pets[0].race).toEqual("Chiuaua");
    expect(pets[0]).toEqual(
      expect.objectContaining({
        age: expect.any(Number),
        color: expect.any(String),
        race: expect.any(String),
        sex: expect.any(String),
        size: expect.any(String),
        specie: expect.any(String),
        orgId: expect.any(String),
      })
    );
  });
});
