import axios from "axios";
import config from "../config/config";
import IImage from "../types/image.type";
import IWebsite from "../types/website.type";

const API_URL = config.WEBSITE_API;

// TODO
// Must authenticate using JWT

export const getWebsite = async () => {
  return axios.get(API_URL + "/api/website");
};

export const initWebsite = () => {
  return axios.post(API_URL + "/api/website").then((response) => {
    console.log("response.data", response.data);

    return response.data;
  });
};

// EDIT WEBSITE
export const editWebsite = (formValues: IWebsite, authToken: string) => {
  console.log("formValues", formValues);

  return axios
    .put(
      API_URL + "/api/website/",
      {
        ...formValues,
      },
      {
        headers: {
          Authorization: "bearer " + authToken,
        },
      }
    )
    .then((response) => {
      console.log("response.data", response.data);

      return response.data;
    });
};

export const removeImg = (deleteImg: string, authToken: string) => {
  return axios
    .delete(API_URL + "/api/website/uploaded/images/" + deleteImg, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data);

      return response.data;
    });
};

export const chooseImg = (selectedImg: string, authToken: string) => {
  return axios
    .put(API_URL + "/api/website/uploaded/images/" + selectedImg, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data);

      return response.data;
    });
};

export const uploadImg = (data: FormData, authToken: string) => {
  return axios
    .put(API_URL + "/api/website/", data, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data);

      return response.data;
    });
};
