import IImage from "./image.type";

export default interface IProject {
  id?: string;
  name: string;
  description: string;
  tags: Array<string>;
  gitHubLink?: string;
  image?: IImage;
  date?: string;
}
