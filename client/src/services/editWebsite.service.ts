import axios from "axios";
import config from "../config/config";

const API_URL = config.WEBSITE_API;

// TODO
// Must authenticate using JWT

export const getWebsite = async () => {
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
      return response.data;
    });
};

// ABOUT
export const editAbout = (aboutText: string, profileImage: string) => {
  return axios
    .put(API_URL + "/api/website/" + config.WEBSITE_ID, {
      aboutText,
      profileImage,
    })
    .then((response) => {
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
      return response.data;
    });
};
