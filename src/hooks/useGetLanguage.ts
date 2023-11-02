import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useGetLanguage = () => {
  return useSelector((state: RootState) => state.language.language);
};
