import axios from "../axios";
import { LoginOutput } from "../types";

export const loginHandler = async (loginInfo: {
  email: string;
  password: string;
}): Promise<LoginOutput> => {
  const { data } = await axios.post("/api/login", loginInfo);
  return data;
};
