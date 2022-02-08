import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IProject } from "./index";

interface IWebsite {
  _id?: string;
  name?: string;
  descText?: string;
  aboutText?: string;
  profileImage?: string;
  projects?: Array<IProject>;
}

interface WebsiteModelInterface extends mongoose.Model<WebsiteDoc> {
  build(attr: IWebsite): WebsiteDoc;
}

interface WebsiteDoc extends mongoose.Document {
  _id?: string;
  name: string;
  descText: string;
  aboutText: string;
  profileImage: string;
  projects: Array<IProject>;
}

const websiteSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  descText: {
    type: String,
  },
  aboutText: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

websiteSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

websiteSchema.plugin(uniqueValidator);

websiteSchema.statics.build = (attr: IWebsite) => new Website(attr);

const Website = mongoose.model<WebsiteDoc, WebsiteModelInterface>(
  "Website",
  websiteSchema
);

export { Website, IWebsite };
