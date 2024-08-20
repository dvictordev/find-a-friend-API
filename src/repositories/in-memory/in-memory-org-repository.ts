import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgRepositoryInterface } from "../interfaces/org-interface-repository";

export class InMemoryOrgRepository implements OrgRepositoryInterface {
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
}
