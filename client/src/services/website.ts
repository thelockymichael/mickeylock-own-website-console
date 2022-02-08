import axios from "axios";
import config from "../config/config";
const baseUrl = config.WEBSITE_API || "/api/website";

const getAll = async () => {
  const response = await axios.get(baseUrl);

  return response;
};

export { getAll };
