import { prisma } from "../../lib/prisma";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";
import { hash } from "bcryptjs";
import { OrgRepositoryInterface } from "../../repositories/interfaces/org-interface-repository";
import { OrgAlreadyExistsError } from "../errors/org-already-exists-error";
interface CreateOrgRequestProps {
  name: string;
  phone: string;
  address: string;
  city: string;
  email: string;
  password: string;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepositoryInterface) {}

  async execute({
    address,
    city,
    name,
    phone,
    email,
    password,
  }: CreateOrgRequestProps) {
    const existsOrg = await this.orgRepository.findUnique(email);

    if (existsOrg) {
      throw new OrgAlreadyExistsError();
    }

    const password_hash = (await hash(password, 6)).toString();

    const org = await this.orgRepository.create({
      address,
      city,
      name,
      phone,
      email,
      password_hash,
    });

    return { org };
  }
}
