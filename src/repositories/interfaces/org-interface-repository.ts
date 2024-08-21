import { Org, Prisma } from "@prisma/client";

export interface OrgRepositoryInterface {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findUnique(email: String): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
  findByCity(city: string): Promise<Org[] | null>;
}
