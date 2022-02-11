import axios from "axios";
import config from "../config/config";
import IWebsite from "../types/website.type";

const API_URL = config.WEBSITE_API;

// TODO
// Must authenticate using JWT

export const getWebsite = async () => {
  return axios.get(API_URL + "/api/website");
};

// EDIT WEBSITE
export const editWebsite = (formValues: IWebsite) => {
  console.log("LOL", API_URL);

  console.log("formValues", formValues);

  return axios
    .put(API_URL + "/api/website/", {
      ...formValues,
    })
    .then((response) => {
      console.log("response.data", response.data);

      return response.data;
    });
};

export const removeImg = (deleteImg: string) => {
  return axios
    .delete("localhost:3001" + "/api/website/uploaded/images/" + deleteImg)
    .then((response) => {
      console.log("response.data", response.data);

      return response.data;
    });
};
