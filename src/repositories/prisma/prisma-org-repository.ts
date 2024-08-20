import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export class PrismaOrgRepository {
  async create(data: Prisma.OrgCreateInput) {
    await prisma.org.create({
      data,
    });
  }
}
