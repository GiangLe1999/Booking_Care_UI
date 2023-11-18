import { CoreOutput } from "./common.dto";

export interface LoggedinUser {
  id: number;
  email: string;
  roleId: string;
}

export interface FetchedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
  image: any;
  roleId: string;
  phoneNumber: string;
  positionId: string;
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
  roleId: string;
  positionId: string;
  avatar?: string;
};

export type EditUserInput = Omit<CreateNewUserInput, "password" | "email">;
