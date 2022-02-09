import IUser from "./user.type";

export default interface ICurrentUser {
  authToken: string;
  user: IUser;
}
