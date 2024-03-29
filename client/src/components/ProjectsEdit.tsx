import React, { useState, useContext, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage, setIn } from "formik";
import moment from "moment";
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

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

// Route
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  createProject,
  editCreatedProject,
  getProjects,
  removeImage,
  removeProject,
} from "../services/projects.service";
// import { ProjectItem } from "../components";

const ProjectsEdit: React.FC<{}> = () => {
  const currentUser = getCurrentUser();

  const { isShown, selectedItem, toggle } = useModal();

  // Edit Project form
  const [editMode, setEditMode] = useState<IProject | undefined>(undefined);

  const editProject = (project: IProject) => {
    const { name, description, gitHubLink, date, tags, image, id } = project;

    // Empty FILE state
    // setFile("");
    // console.log("edit tags", `das ${tags}`);
    // console.log("edit tags", `das ${JSON.stringify(tags)}`);

    console.log("date", date);
    console.log("moment date", moment().format("MM.DD.yyyy"));
    // moment().format("yyyy-MM-DD"),

    console.log(moment(date).format("yyyy-MM-DD"));

    setInitValues({
      ...initValues,
      projectForm: {
        id,
        name,
        description,
        gitHubLink: gitHubLink || "",
        date: date
          ? moment(date).format("yyyy-MM-DD")
          : moment().format("MM.DD.yyyy"),
        tags: JSON.stringify(tags),
      },
    });

    // if (image?.img) {
    //   const json = JSON.stringify({ blob: image?.img.data.toString() });

    //   // console.log("ASD-123", json);

    //   setFile(json);
    // }
    setEditMode(project);
  };
  // For project removal
  const onConfirm = () => {
    deleteProject(selectedItem);
    toggle();
  };
  const onCancel = () => {
    toggle();
  };

  const [sidebarClass, toggleSidebarClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<Blob | string>("");
  const [initValues, setInitValues] = useState<{
    projects: Array<IProject>;
    projectForm: {
      id?: string;
      name: string;
      description: string;
      gitHubLink: string;
      tags: Array<string> | string;
      date: string;
    };
    selectedProfileImg?: IImage;
  }>({
    projects: [],
    projectForm: {
      name: "",
      description: "",
      tags: [],
      gitHubLink: "",
      date: moment().format("yyyy-MM-DD"),
    },
    selectedProfileImg: undefined,
  });

  const sendForm = (formValues) => {
    if (editMode) {
      // TODO
      // 1. Create editMode method

      sendEditedProject(formValues);

      console.log("I AM EDITING PROJECT");
    } else {
      sendNewProject(formValues);
    }
  };

  const sendEditedProject = (project) => {
    setMessage("");
    setLoading(true);

    console.log("sendForm");
    console.log("formValues", project);

    // Convert tags into array

    const data = new FormData();
    data.append("image", file);

    // Append all JSON values to FormData
    for (const key in project) {
      // if (key === "tags") {
      //   var jsonArr = JSON.stringify(project[key]);

      //   data.append(key, jsonArr);
      // } else {
      data.append(key, project[key]);
      // }
    }

    console.log("dataForm", data);

    editCreatedProject(data, currentUser!!.authToken).then(
      (response) => {
        setLoading(false);

        const { updatedProject } = response;

        console.log("edit project", updatedProject);

        // TODO
        // Edit properties of selected project
        // Find
        const { projects } = initValues;
        const projectIndex = projects.findIndex(
          (item) => item.id === updatedProject.id
        );

        const updatedProjects = projects.map((obj, index) => {
          return index === projectIndex ? updatedProject : obj;
        });

        setInitValues({
          ...initValues,
          projects: updatedProjects,
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

  const sendNewProject = (formValues) => {
    setMessage("");
    setLoading(true);

    console.log("sendForm");
    console.log("formValues", formValues);

    // Convert tags into array
    const convertedArr = JSON.parse(formValues.tags);
    const newProject = {
      ...formValues,
      tags: convertedArr,
    };
    const data = new FormData();
    data.append("image", file);

    // Append all JSON values to FormData
    for (const key in newProject) {
      if (key === "tags") {
        var jsonArr = JSON.stringify(newProject[key]);

        data.append(key, jsonArr);
      } else {
        data.append(key, newProject[key]);
      }
    }

    console.log("dataForm", data);

    createProject(data, currentUser!!.authToken).then(
      (response) => {
        setLoading(false);

        const { newProject } = response;

        setInitValues({
          ...initValues,
          projects: [newProject].concat(initValues.projects),
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required!"),
    description: Yup.string().required("This field is required!"),
    gitHubLink: Yup.string().required("This field is required!"),
    tags: Yup.array().required("This field is required!"),
    date: Yup.date().required("This field is required!"),
  });

  useEffect(() => {
    const getInitValues = async () => {
      const { data } = await getProjects();

      console.log("projects", data);
      setInitValues({
        ...initValues,
        projects: data,
      });
    };

    getInitValues();
  }, []);

  // TODO
  // 1. [X] Dummy data
  // 2. [X] SEND ALL DATA AT ONE
  // 3. [X] Remove a PROJECT
  //    3.1. Display modal
  //    3.2. Create remove FUNC
  // 4. [ ] EDIT project

  const deleteProject = (projectToRemove: IProject) => {
    removeProject(projectToRemove, currentUser!!.authToken).then(
      (response) => {
        setLoading(false);

        const deletedProject: IProject = response.deletedProject;

        const updatedProjects = initValues.projects.filter(
          (item) => item.id !== deletedProject.id
        );

        setInitValues({
          ...initValues,
          projects: updatedProjects,
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

    if (projectToRemove.image) {
      removeImage(projectToRemove.image, currentUser!!.authToken).then(
        (response) => {
          setLoading(false);

          // const updatedImgs = initValues.uploadedImgs.filter(
          //   (item) => item.id !== deleteImg
          // );

          // setInitValues({
          //   ...initValues,
          //   uploadedImgs: updatedImgs,
          // });
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
    }
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
            <h3>
              Projects <b>{editMode ? "Edit" : "Add"} </b>
            </h3>
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
              <div className="form-group">
                <label htmlFor="Tags">
                  Tags (e.g. ["React Native", "TypeScript"])
                </label>
                <Field name="tags" type="text" className="form-control" />
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Github link">GitHub Link</label>
                <Field name="gitHubLink" type="text" className="form-control" />
                <ErrorMessage
                  name="gitHubLink"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Date">When was the project created?</label>

                <Field
                  rows="4"
                  name="date"
                  type="date"
                  className="form-control"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="Upload file">Upload file</label>

                <Field
                  name="file"
                  type="file"
                  className="form-control"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
                <ErrorMessage
                  name="file"
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
          <div className="row">
            {initValues.projects?.map((item) => {
              let src: IImage | string;
              let dataBase64;
              if (item?.image) {
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
                    <img className="card-img-top" src={src} alt="" />
                    <div className="card-body">
                      <h4 className="card-title">{item.name}</h4>
                      <p className="card-text">{item.description}</p>

                      <a href={item.gitHubLink} className="btn btn-primary">
                        <FontAwesomeIcon
                          size="2x"
                          color="#212224"
                          icon={faGithub}
                        />
                        GitHub
                      </a>
                      <button
                        onClick={() => toggle(item)}
                        className="btn btn-danger btn-block"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => editProject(item)}
                        className="btn btn-primary btn-block"
                      >
                        Edit
                      </button>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "0.0rem",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        paddingTop: "0.4rem",
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
                            margin: "0.0rem 0.0rem 0.4em 0.4rem",
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

export default ProjectsEdit;
