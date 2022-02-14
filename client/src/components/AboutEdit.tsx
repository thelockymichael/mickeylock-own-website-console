import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  editWebsite,
  removeImg,
  getWebsite,
  chooseImg,
} from "../services/editWebsite.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import config from "../config/config";
import Sidebar from "./Sidebar";
import { FileUploader } from "./FileUploader";
import { useModal } from "../hooks/useModal";
import { Modal } from "./AlertModal";
import { ConfirmationModal } from "./AlertModal/confirmation-modal";

const About: React.FC<{}> = () => {
  const [sidebarClass, toggleSidebarClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [initValues, setInitValues] = useState<{
    aboutText: string;
    selectedProfileImg: string;
    uploadedImgs: Array<string>;
  }>({
    aboutText: "",
    selectedProfileImg: "",
    uploadedImgs: [],
  });

  //console.log(config.WEBSITE_API + "/thumbnails/" + initValues.uploadedImgs[1]);

  const sendForm = (formValues: {
    aboutText: string;
    selectedProfileImg: string;
  }) => {
    setMessage("");
    setLoading(true);

    editWebsite(formValues).then(
      () => {
        setLoading(false);
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

  const validationSchema = Yup.object().shape({
    aboutText: Yup.string().required("This field is required!"),
    selectedProfileImg: Yup.string().required("This field is required!"),
  });

  useEffect(() => {
    const getInitValues = async () => {
      const { data } = await getWebsite();

      console.log("uploadedImages", data.uploadedImgs);

      setInitValues({
        aboutText: data.aboutText,
        selectedProfileImg: data.selectedProfileImg,
        uploadedImgs: data.uploadedImgs,
      });
    };

    getInitValues();
  }, []);

  const deleteImage = (deleteImg) => {
    console.log("removeImage", deleteImg);

    removeImg(deleteImg).then(
      (response) => {
        setLoading(false);

        const { updatedWebsite } = response;

        setInitValues({
          ...initValues,
          uploadedImgs: updatedWebsite.uploadedImgs,
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

  const selectImage = (selectedProfileImg) => {
    console.log("selectedImg", selectedProfileImg);

    chooseImg(selectedProfileImg).then(
      (response) => {
        setLoading(false);

        const { updatedWebsite } = response;

        console.log("updatedWebsite", updatedWebsite);

        setInitValues({
          ...initValues,
          selectedProfileImg: updatedWebsite.selectedProfileImg,
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

  const hasUploadedImgs = initValues.uploadedImgs ? true : false;

  // TODO
  // 1. Multi form for Image file upload
  // 2. ???
  const { isShown, selectedItem, toggle } = useModal();

  const onConfirm = () => {
    deleteImage(selectedItem);
    toggle();
  };
  const onCancel = () => {
    toggle();
  };

  return (
    <div className="wrapper">
      <Sidebar sidebarClass={sidebarClass} />
      <div id="content">
        <div className="container">
          <header className="dashboard-header">
            <button
              onClick={() => {
                toggleSidebarClass(!sidebarClass);
              }}
              type="button"
              id="sidebarCollapse"
              className="btn btn-info"
            >
              <FontAwesomeIcon size="4x" color="#FFF" icon={faBars} />
            </button>
            <h3>About Edit</h3>
          </header>
          <Formik
            enableReinitialize
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={sendForm}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="About">About text</label>
                <Field
                  component="textarea"
                  rows="4"
                  name="aboutText"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="aboutText"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Save</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
          <FileUploader initValues={initValues} setInitValues={setInitValues} />
          {/* <button onClick={toggle}>Open modal</button> */}
          <div className="card-columns">
            {hasUploadedImgs &&
              initValues.uploadedImgs.map((itemImg) => (
                <div
                  key={itemImg}
                  className={
                    initValues.selectedProfileImg === itemImg
                      ? "card selected-card"
                      : "card"
                  }
                >
                  <img
                    className="card-img-top"
                    alt={itemImg}
                    src={config.WEBSITE_API + "/thumbnails/" + itemImg}
                  />
                  <div className="form-group">
                    <p>{itemImg}</p>
                    <button
                      onClick={() => selectImage(itemImg)}
                      className="btn btn-primary btn-block"
                      disabled={
                        initValues.selectedProfileImg === itemImg ? true : false
                      }
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Select</span>
                    </button>
                    <button
                      onClick={() => toggle(itemImg)}
                      className="btn btn-danger btn-block"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        headerText="Delete profile image?"
        isShown={isShown}
        hide={toggle}
        modalContent={
          <ConfirmationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            message="Are you sure you want to delete selected profile image?"
          />
        }
      />
    </div>
  );
};

export default About;
