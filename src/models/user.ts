import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IProject } from "./index";

interface IUser {
  _id?: string;
  fullName: string;
  password: string;
  about: string;
  profileImage: string;
  projects: Array<IProject>;
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  _id?: string;
  fullName: string;
  password: string;
  about: string;
  profileImage: string;
  projects: Array<IProject>;
}

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    // the hashed password should not be revealed
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

userSchema.statics.build = (attr: IUser) => new User(attr);

const User = mongoose.model<UserDoc, UserModelInterface>("User", userSchema);

export { User, IUser };
