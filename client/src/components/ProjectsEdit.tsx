import React, { useState, useContext, useEffect } from "react";

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
import { WebsiteContext } from "../contexts/website";
import IImage from "../types/image.type";
import { getCurrentUser } from "../services/auth.service";
import IProject from "../types/project.type";

const ProjectsEdit: React.FC<{}> = () => {
  const currentUser = getCurrentUser();

  const [sidebarClass, toggleSidebarClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [initValues, setInitValues] = useState<{
    projects?: Array<IProject>;
    // selectedProfileImg?: IImage;
    // uploadedImgs: Array<IImage>;
  }>({
    projects: [],
    // selectedProfileImg: undefined,
    // uploadedImgs: [],
  });

  const sendForm = (formValues: { aboutText: string }) => {
    setMessage("");
    setLoading(true);

    editWebsite(formValues, currentUser!!.authToken).then(
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
  });

  useEffect(() => {
    const getInitValues = async () => {
      const { data } = await getWebsite();

      console.log("uploadedImages", data.projects);

      setInitValues({
        projects: data.projects,
      });
    };

    getInitValues();
  }, []);

  // const hasprojects = initValues.uploadedImgs ? true : false;

  // TODO
  // 1. Multi form for Image file upload
  // 2. ???

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
            <h3>Projects Edit</h3>
          </header>
          {/* <Formik
            enableReinitialize
            initialValues={{ aboutText: initValues.aboutText }}
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
          </Formik> */}
          {/* <FileUploader
            authToken={currentUser!!.authToken}
            initValues={initValues}
            setInitValues={setInitValues}
          /> */}
          <div className="card-columns"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEdit;
