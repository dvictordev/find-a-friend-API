import { prisma } from "../../lib/prisma";
import { InMemoryOrgRepository } from "../../repositories/in-memory/in-memory-org-repository";
import { hash } from "bcryptjs";
import { OrgRepositoryInterface } from "../../repositories/interfaces/org-interface-repository";
interface CreateOrgRequestProps {
  name: string;
  phone: string;
  address: string;
  city: string;
  email: string;
  password: string;
}

export class CreateOrgUseCase {
  constructor(private inMemoryRepostory: OrgRepositoryInterface) {}

  async execute({
    address,
    city,
    name,
    phone,
    email,
    password,
  }: CreateOrgRequestProps) {
    const password_hash = (await hash(password, 6)).toString();

    const org = this.inMemoryRepostory.create({
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
