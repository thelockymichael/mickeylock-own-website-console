import axios from "axios";
import config from "../config/config";
import ICurrentUser from "../types/currentUser.type";

const API_URL = config.WEBSITE_API;

// TODO
// Must authenticate using JWT

export const getHome = async () => {
  return axios.get(API_URL + "/api/website");
};

// HOME
export const editHome = (fullName: string, descText: string) => {
  return axios
    .put(API_URL + "/api/website/" + config.WEBSITE_ID, {
      name: fullName,
      descText,
    })
    .then((response) => {
      console.log("response", response.data);

      return response.data;
    });
};

// ABOUT
export const editAbout = (fullName: string, descText: string) => {
  return axios
    .put(API_URL + "/api/website/" + config.WEBSITE_ID, {
      name: fullName,
      descText,
    })
    .then((response) => {
      console.log("response", response.data);

      return response.data;
    });
};

// PROJECTS
export const editProjects = (fullName: string, descText: string) => {
  return axios
    .put(API_URL + "/api/website/" + config.WEBSITE_ID, {
      name: fullName,
      descText,
    })
    .then((response) => {
      console.log("response", response.data);

      return response.data;
    });
};
