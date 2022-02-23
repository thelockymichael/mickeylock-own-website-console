import axios from "axios"
import config from "../config/config"
import IImage from "../types/image.type"
import IProject from "../types/project.type"
import IWebsite from "../types/website.type"

const API_URL = config.WEBSITE_API

// TODO
// Must authenticate using JWT

export const getProjects = async () => {
  return axios.get(API_URL + "/api/website/projects")
}

export const createProject = async (data: FormData, authToken: string) => {
  return axios
    .post(API_URL + "/api/website/projects", data, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data)

      return response.data
    })
}

export const editCreatedProject = (data: FormData, authToken: string) => {
  console.log("formValues", data)

  return axios
    .put(API_URL + "/api/website/projects", data, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data)

      return response.data
    })
}

export const removeProject = async (
  projectToRemove: IProject,
  authToken: string
) => {
  return axios
    .delete(API_URL + "/api/website/projects/" + projectToRemove.id, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data)

      return response.data
    })
}

export const removeImage = async (image: IImage, authToken: string) => {
  return axios
    .delete(API_URL + "/api/website/projects/images/" + image?.id, {
      headers: {
        Authorization: "bearer " + authToken,
      },
    })
    .then((response) => {
      console.log("response.data", response.data)

      return response.data
    })
}
