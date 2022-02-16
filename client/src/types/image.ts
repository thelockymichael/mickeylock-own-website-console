export default interface IImage {
  id?: string;
  name: string;
  img?: {
    type: string;
    data: Array<number>;
  };
  imgType?: string;
}
