import IProject from "./project.type";

export default interface IUser {
  _id?: string;
  fullName: string;
  passwordHash: string;
  about: string;
  profileImage: string;
  projects: Array<IProject>;
}
