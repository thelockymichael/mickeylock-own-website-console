import { IProject } from "./index";

interface IUser {
  _id?: string;
  fullName: string;
  password: string;
  about: string;
  profileImage: string;
  projects: Array<IProject>;
}

export type { IUser };
