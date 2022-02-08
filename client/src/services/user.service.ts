import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

export const getUserBoard = () => {
  return axios.get(API_URL + "user", {
    headers: {
      Authorization: authHeader(),
    },
  });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", {
    headers: {
      Authorization: authHeader(),
    },
  });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", {
    headers: {
      Authorization: authHeader(),
    },
  });
};
