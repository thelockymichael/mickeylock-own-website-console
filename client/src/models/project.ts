import { IUser } from ".";

interface IProject {
  _id?: string;
  name: string;
  description: string;
  tags?: string[];
  gitHubLink?: string;
  imageUrl?: string;
  date?: Date;
  user: IUser;
}

export type { IProject };
