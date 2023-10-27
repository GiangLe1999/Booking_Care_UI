import axios from "../axios";
import { CoreOutput } from "../dtos/common.dto";
import {
  CreateNewUserInput,
  EditUserInput,
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

export const deleteUser = async (id: number) => {
  try {
    const { data } = await axios.delete(`/api/user/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editUser = async (id: number, newUserData: EditUserInput) => {
  try {
    const { data } = await axios.put(`/api/edit-user`, { id, ...newUserData });
    return data;
  } catch (error) {
    console.log(error);
  }
};
