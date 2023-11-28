import axios from "axios";

const localStorageState = JSON.parse(
  localStorage.getItem("persist:root") as any
);
const tokenState = JSON.parse(localStorageState.token);

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "x-jwt": tokenState.token || "",
  },
  withCredentials: true,
});

export default instance;
