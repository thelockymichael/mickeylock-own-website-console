import React, { SetStateAction, Dispatch, useState } from "react";
import { uploadImg } from "../../services/editWebsite.service";
import IImage from "../../types/image";
import IWebsite from "../../types/website.type";
import "./styles.css";

interface IProps {
  initValues: {
    aboutText: string;
    selectedProfileImg?: IImage;
    uploadedImgs: Array<IImage>;
  };
  setInitValues: Dispatch<
    SetStateAction<{
      aboutText: string;
      selectedProfileImg?: IImage;
      uploadedImgs: IImage[];
    }>
  >;
}

export const FileUploader: React.FC<IProps> = ({
  initValues,
  setInitValues,
}) => {
  const [file, setFile] = useState<Blob | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const data = new FormData();

    data.append("selectedProfileImg", file);

    uploadImg(data).then(
      (response) => {
        const { uploadedImgs, selectedProfileImg } = response.updatedWebsite;
        setMessage("");
        setLoading(false);

        console.log("uploadedImgs", uploadedImgs);
        console.log("selectedProfileImg", selectedProfileImg);

        const newArray = [selectedProfileImg].concat(initValues.uploadedImgs);
        // TODO
        // 1. Fix this
        setInitValues({
          ...initValues,
          selectedProfileImg: selectedProfileImg,
          uploadedImgs: newArray,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <>
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
        <div className="form-group files">
          <label>Upload your Image File </label>
          <input
            type="file"
            onChange={onInputChange}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading || !file}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          <span>Upload Image </span>
        </button>
      </form>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </>
  );
};
