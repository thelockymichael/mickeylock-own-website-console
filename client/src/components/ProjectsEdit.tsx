import React, { useState, useContext, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  editWebsite,
  removeImg,
  getWebsite,
  chooseImg,
} from "../services/editWebsite.service";
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

import { dummyProjects } from "./dummy-projects";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

// Route
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getProjects } from "../services/projects.service";
// import { ProjectItem } from "../components";

const ProjectsEdit: React.FC<{}> = () => {
  const currentUser = getCurrentUser();

  const [sidebarClass, toggleSidebarClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [initValues, setInitValues] = useState<{
    projects?: Array<IProject>;
    projectForm: {
      name: string;
      description: string;
      gitHubLink: string;
    };

    // selectedProfileImg?: IImage;
    // uploadedImgs: Array<IImage>;
  }>({
    projects: dummyProjects,
    projectForm: {
      name: "",
      description: "",
      // tags: [],
      gitHubLink: "",
      // date: new Date(),
    },
    // selectedProfileImg: undefined,
    // uploadedImgs: [],
  });

  const sendForm = (formValues) => {
    setMessage("");
    setLoading(true);

    console.log("sendForm");

    // editWebsite(formValues, currentUser!!.authToken).then(
    //   () => {
    //     setLoading(false);
    //   },
    //   (error) => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setLoading(false);
    //     setMessage(resMessage);
    //   }
    // );
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    description: Yup.string().required("This field is required!"),
    gitHubLink: Yup.string().required("This field is required!"),

    // tags: Yup.string().required("This field is required!"),
    // date: Yup.string().required("This field is required!"),
  });

  useEffect(() => {
    const getInitValues = async () => {
      const { data } = await getProjects();

      console.log("data initValues", data[0].name);
      console.log("data tags values", data[0].tags);

      console.log("uploadedImages", data);
      setInitValues({
        ...initValues,
        projects: data,
      });
    };

    getInitValues();
  }, []);

  // const hasprojects = initValues.uploadedImgs ? true : false;

  // TODO
  // 1. [X] Dummy data
  // 2. CREATE BACKEND FOR PROJECT, TEST WITH POSTMAN !!!
  // 3. Create form for data
  //    (name, description, tags, gitHubLink, date)
  // 4. Image form
  // 5. Send all date at once to backend

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
          <Formik
            enableReinitialize
            initialValues={initValues.projectForm}
            validationSchema={validationSchema}
            onSubmit={sendForm}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="Project name">Project name</label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  component="textarea"
                  rows="4"
                  name="description"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="Tags">Tags</label>
                <Field
                  component="text"
                  name="tags"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="alert alert-danger"
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="Github link">GitHub Link</label>
                <Field name="gitHubLink" type="text" className="form-control" />
                <ErrorMessage
                  name="gitHubLink"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="Date">Date</label>
                <Field
                  component="text"
                  rows="4"
                  name="date"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="alert alert-danger"
                />
              </div> */}
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
          {/* <FileUploader
            authToken={currentUser!!.authToken}
            initValues={initValues}
            setInitValues={setInitValues}
          /> */}
          {/* {initValues.projects?.map((item) => ( */}

          <div className="row">
            {initValues.projects?.map((item) => {
              let src: IImage | string;
              let dataBase64;
              if (item.image) {
                const { imgType, img } = item.image;
                if (img) dataBase64 = img.data;
                const data = Buffer.from(dataBase64).toString("base64");
                src = `data:${imgType};charset=utf-8;base64,${data}`;
              } else {
                src = "https://via.placeholder.com/700x400";
              }

              return (
                <div key={item.id} className="col-lg-4 col-sm-6 mb-4">
                  <div style={{ padding: 0 }} className="card">
                    <a href="#">
                      <img className="card-img-top" src={src} alt="" />
                    </a>
                    <div className="card-body">
                      <h4 className="card-title">
                        <a href="#">{item.name}</a>
                      </h4>
                      <p className="card-text">{item.description}</p>

                      <a href={item.gitHubLink} className="btn btn-primary">
                        <FontAwesomeIcon
                          size="2x"
                          color="#212224"
                          icon={faGithub}
                        />
                        GitHub
                      </a>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "0.4rem 0.0rem",
                        flexDirection: "row",
                      }}
                      className="card-footer"
                    >
                      {item.tags?.map((tag) => (
                        <div
                          key={tag}
                          style={{
                            padding: "0.5rem",
                            backgroundColor: "rgb(80, 34, 116)",
                            color: "#FFF",
                            marginLeft: "0.5rem",
                            borderRadius: "8px",
                          }}
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEdit;
