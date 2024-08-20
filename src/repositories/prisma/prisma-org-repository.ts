import { Org, Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { OrgRepositoryInterface } from "../interfaces/org-interface-repository";

export class PrismaOrgRepository implements OrgRepositoryInterface {
  async findUnique(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    });

    return org;
  }
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return await prisma.org.create({
      data,
    });
  }
}
