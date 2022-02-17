import IImage from "./image.type";
import IUser from "./user.type";

export default interface IProject {
  _id?: string;
  name: string;
  description: string;
  tags?: string[];
  gitHubLink?: string;
  image?: IImage;
  date?: Date;
  user: IUser;
}
