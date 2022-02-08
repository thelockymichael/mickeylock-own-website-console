import { IProject } from "./index";

interface IWebsite {
  _id?: string;
  name?: string;
  descText?: string;
  aboutText?: string;
  profileImage?: string;
  projects?: Array<IProject>;
}

export type { IWebsite };
