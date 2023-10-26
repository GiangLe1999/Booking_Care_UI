import axios from "../axios";
import { CoreOutput } from "../dtos/common.dto";
import {
  CreateNewUserInput,
  GetAllUsersOutput,
  LoginOutput,
} from "../dtos/user.dto";

export const loginHandler = async (loginInfo: {
  email: string;
  password: string;
}): Promise<LoginOutput> => {
  const { data } = await axios.post("/api/login", loginInfo);
  return data;
};

export const getAllUsers = async (): Promise<GetAllUsersOutput> => {
  const { data } = await axios.get("/api/users");
  return data;
};

export const createNewUser = async (createNewUserInput: CreateNewUserInput) => {
  try {
    const { data } = await axios.post("/api/user", createNewUserInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};
