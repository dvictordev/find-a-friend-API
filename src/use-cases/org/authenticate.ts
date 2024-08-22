import { compare, hash } from "bcryptjs";
import { OrgRepositoryInterface } from "../../repositories/interfaces/org-interface-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface CreateOrgRequestProps {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private orgRepository: OrgRepositoryInterface) {}

  async execute({ email, password }: CreateOrgRequestProps) {
    const org = await this.orgRepository.findUnique(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, org.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      ...org,
      password: undefined,
    };
  }
}
