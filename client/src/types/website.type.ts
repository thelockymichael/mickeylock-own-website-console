import IProject from "./project.type";

export default interface IWebsite {
  _id?: string;
  name?: string;
  descText?: string;
  aboutText?: string;
  uploadedImgs?: Array<string>;
  selectedProfileImg?: string;
  projects?: Array<IProject>;
}
