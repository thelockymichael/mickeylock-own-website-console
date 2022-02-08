import { User } from "../../models";

// Users
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

export { usersInDb };
