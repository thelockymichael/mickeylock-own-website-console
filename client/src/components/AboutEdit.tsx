import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editAbout, getWebsite } from "../services/editWebsite.service";

const About: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [initValues, setInitValues] = useState<{
    aboutText: string;
    profileImage: string;
  }>({
    aboutText: "",
    profileImage: "",
  });

  const sendForm = (formValue: { aboutText: string; profileImage: string }) => {
    const { aboutText, profileImage } = formValue;

    console.log("sendForm", aboutText, profileImage);

    setMessage("");
    setLoading(true);

    editAbout(aboutText, profileImage).then(
      () => {
        window.location.reload();
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
    profileImage: Yup.string().required("This field is required!"),
  });

  useEffect(() => {
    const getInitValues = async () => {
      const { data } = await getWebsite();

      console.log("data", data.aboutText);
      console.log("data", data.profileImage);
      setInitValues({
        aboutText: data.aboutText,
        profileImage: data.profileImage,
      });
    };

    getInitValues();
  }, []);

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
                <label htmlFor="aboutText">About text</label>
                <Field name="aboutText" type="text" className="form-control" />
                <ErrorMessage
                  name="aboutText"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="profileImage">Profile URL</label>
                <Field
                  name="profileImage"
                  type="profileImage"
                  className="form-control"
                />
                <ErrorMessage
                  name="profileImage"
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
        </div>
      </div>
    </div>
  );
};

export default About;
