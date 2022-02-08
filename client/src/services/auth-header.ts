import IUser from "../types/user.type";

export default function authHeader() {
  interface IData {
    user: IUser;
    accessToken: string;
  }

  const userStr = localStorage.getItem("user");
  let user: IData = {
    user: { username: "", email: "", password: "" },
    accessToken: "",
  };
  if (userStr) user = JSON.parse(userStr);

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return "bearer " + user.accessToken; // for Node.js Express back-end
  } else {
    return "";
  }
}
