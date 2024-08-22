import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";
import { hash } from "bcryptjs";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let orgRepository: InMemoryOrgRepository;
let authUseCase: AuthenticateUseCase;
describe("Authenticate Org", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    authUseCase = new AuthenticateUseCase(orgRepository);
  });

  it("should be able to authenticate as a Org", async () => {
    const org = await orgRepository.create({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password_hash: await hash("12345678", 6),
    });

    const auth = await authUseCase.execute({
      email: "example@email.com",
      password: "12345678",
    });

    expect(auth).toEqual(
      expect.objectContaining({
        name: "salvapets",
        address: "rua fulando",
        city: "Pantano Grande",
        phone: "51999999999",
      })
    );
  });

  it("should not be able to authenticate with invalid password", async () => {
    const org = await orgRepository.create({
      name: "salvapets",
      address: "rua fulando",
      city: "Pantano Grande",
      phone: "51999999999",
      email: "example@email.com",
      password_hash: await hash("12345678", 6),
    });

    await expect(() =>
      authUseCase.execute({
        email: "example@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
