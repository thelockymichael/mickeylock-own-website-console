import mongoose, { PopulatedDoc } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from ".";

interface IProject {
  _id?: string;
  name: string;
  description: string;
  tags?: string[];
  gitHubLink?: string;
  imageUrl?: string;
  date?: Date;
  user: PopulatedDoc<IUser>;
  // user: string;
}

interface ProjectModelInterface extends mongoose.Model<ProjectDoc> {
  build(attr: IProject): ProjectDoc;
}

interface ProjectDoc extends mongoose.Document {
  _id?: string;
  name: string;
  description: string;
  tags?: string[];
  gitHubLink?: string;
  imageUrl?: string;
  date?: Date;
  user: PopulatedDoc<IUser>;
  // user: string;
}

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  gitHubLink: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

ProjectSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

ProjectSchema.plugin(uniqueValidator);

ProjectSchema.statics.build = (attr: IProject) => new Project(attr);

const Project = mongoose.model<ProjectDoc, ProjectModelInterface>(
  "Project",
  ProjectSchema
);

export { Project, IProject };
