import axios from "axios";
import config from "../config/config";
import ICurrentUser from "../types/currentUser.type";

const API_URL = config.WEBSITE_API;

export const register = (username: string, password: string) => {
  return axios.post(API_URL + "signup", {
    fullName: username,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "/api/login", {
      fullName: username,
      password,
    })
    .then((response) => {
      console.log("response", response.data);

      if (response.data.authToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const currentUser: ICurrentUser = JSON.parse(userStr);
    return currentUser;
  }

  return null;
};
