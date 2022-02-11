import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  editWebsite,
  removeImg,
  getWebsite,
} from "../services/editWebsite.service";
import config from "../config/config";

const About: React.FC<{}> = () => {
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

  const [modal, setModal] = useState<boolean>(false);

  const deleteImage = (deleteImg) => {
    console.log("removeImage", deleteImg);

    removeImg(deleteImg);

    // const { data } = await getWebsite();
    // console.log("data.response", data);

    // setMessage("");
    // setLoading(true);
    // removeImg(deleteImg).then(() => {});

    removeImg(deleteImg).then(
      (respon) => {
        setLoading(false);

        // setInitValues({
        //   ...initValues,
        //   uploadedImgs: data.uploadedImgs,
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
  };

  return (
    <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Mickeylock.com</h3>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <a href="/dashboard">Dashboard</a>
          </li>

          <li>
            <a href="/dashboard/home">Home</a>
          </li>
          <li>
            <a href="/dashboard/about">About</a>
          </li>
          <li>
            <a href="/dashboard/projects">Projects</a>
          </li>
        </ul>
      </nav>

      <div id="content">
        <div className="container">
          <header className="jumbotron">
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
                <Field name="aboutText" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="selctedProfileImg">
                  Selected Profile Image
                </label>
                <Field
                  name="selectedProfileImg"
                  type="text"
                  className="form-control"
                />
                <ErrorMessage
                  name="selectedProfileImg"
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
          <div className="container-fluid pt-3">
            <div className="card-columns">
              {initValues.uploadedImgs.map((itemImg) => (
                <div key={itemImg} className="card">
                  <img
                    className="card-img-top"
                    width={"80px"}
                    alt="profile"
                    src={config.WEBSITE_API + "/thumbnails/" + itemImg}
                  />
                  <div className="form-group">
                    <button
                      onClick={(event) => removeImg(itemImg)}
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
      </div>
    </div>
  );
};

export default About;
