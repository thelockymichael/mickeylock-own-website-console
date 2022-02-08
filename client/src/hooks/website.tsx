import { useContext } from "react";
import { WebsiteContext, IWebsiteContext } from "../contexts/website";

export const useWebsiteContext = () =>
  useContext<IWebsiteContext>(WebsiteContext);
