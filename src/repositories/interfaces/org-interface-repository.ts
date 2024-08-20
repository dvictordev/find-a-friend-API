import { Org, Prisma } from "@prisma/client";

export interface OrgRepositoryInterface {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findUnique(email: String): Promise<Org | null>;
}
