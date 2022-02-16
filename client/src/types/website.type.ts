import IImage from "./image";
import IProject from "./project.type";

export default interface IWebsite {
  _id?: string;
  name?: string;
  descText?: string;
  aboutText?: string;
  uploadedImgs?: Array<IImage>;
  selectedProfileImg?: IImage;
  projects?: Array<IProject>;
}
