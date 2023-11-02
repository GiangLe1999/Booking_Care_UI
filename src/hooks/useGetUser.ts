import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useGetUser = () => {
  return useSelector((state: RootState) => state.user.user);
};
