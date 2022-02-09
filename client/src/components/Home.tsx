import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editHome, getHome } from "../services/home.service";

const Home: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [initValues, setInitValues] = useState<{
    name: string;
    descText: string;
  }>({
    name: "",
    descText: "",
  });

  const sendForm = (formValue: { name: string; descText: string }) => {
    const { name, descText } = formValue;

    console.log("sendForm", name, descText);

    setMessage("");
    setLoading(true);

    editHome(name, descText).then(
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
    name: Yup.string().required("This field is required!"),
    descText: Yup.string().required("This field is required!"),
  });

  useEffect(() => {
    const getInitValues = async () => {
      const { data } = await getHome();

      console.log("data", data.name);
      console.log("data", data.descText);
      setInitValues({
        name: data.name,
        descText: data.descText,
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
            <h3>Home Edit</h3>
          </header>
          <Formik
            enableReinitialize
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={sendForm}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descText">Description text</label>
                <Field
                  name="descText"
                  type="descText"
                  className="form-control"
                />
                <ErrorMessage
                  name="descText"
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

export default Home;
