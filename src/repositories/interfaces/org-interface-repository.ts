import { Org, Prisma } from "@prisma/client";

export interface OrgRepositoryInterface {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
