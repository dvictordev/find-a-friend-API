import { Org, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { OrgRepositoryInterface } from "../interfaces/org-interface-repository";

export class InMemoryOrgRepository implements OrgRepositoryInterface {
  public org: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      ...data,
      id: randomUUID(),
    };

    this.org.push(org);

    return org;
  }
}
