import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgRepositoryInterface } from "../interfaces/org-interface-repository";

export class InMemoryOrgRepository implements OrgRepositoryInterface {
  async findById(id: string): Promise<Org | null> {
    const org = this.org.find((org) => org.id == id);

    if (!org) {
      return null;
    }

    return org;
  }
  public org: Org[] = [];

  async findUnique(email: String): Promise<Org | null> {
    const org = this.org.find((org) => org.email == email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      ...data,
      id: randomUUID(),
    };

    this.org.push(org);

    return org;
  }

  async findByCity(city: string): Promise<Org[] | null> {
    const orgs = this.org.filter((org) => org.city == city);

    return orgs;
  }
}
