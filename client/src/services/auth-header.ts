import ICurrentUser from "../types/currentUser.type";

export default function authHeader() {
  const userStr = localStorage.getItem("user");
  let user: ICurrentUser = {
    user: {
      fullName: "",
      about: "",
      profileImage: "",
      passwordHash: "",
      projects: [],
    },
    authToken: "",
  };
  if (userStr) user = JSON.parse(userStr);

  if (user && user.authToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return "bearer " + user.authToken; // for Node.js Express back-end
  } else {
    return "";
  }
}
