import IImage from "./image.type";
import IUser from "./user.type";

interface tempImage {
  img?: string;
}

export default interface IProject {
  id?: string;
  name: string;
  description: string;
  tags: Array<string>;
  gitHubLink?: string;
  image?: IImage;
  date?: Date;
}

/**
 *   id?: string;
  name: string;
  img?: {
    type: string;
    data: Array<number>;
  };
  imgType?: string;
}

 */
