import { CoreOutput } from "./common.dto";

export interface LoggedinUser {
  email: string;
  roleId: string;
}

export interface FetchedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: number;
  image: string;
  roleId: number;
  phoneNumber: string;
  positionId: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginOutput extends CoreOutput {
  user?: LoggedinUser;
}

export interface GetAllUsersOutput extends CoreOutput {
  users?: FetchedUser[];
}

export type CreateNewUserInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  role: string;
};

export type EditUserInput = Omit<CreateNewUserInput, "password">;
