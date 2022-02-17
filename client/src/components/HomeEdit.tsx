import React, { useState, useContext, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editWebsite, getWebsite } from "../services/editWebsite.service";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { WebsiteContext } from "../contexts/website";
import { getCurrentUser } from "../services/auth.service";

import "./card.style.css";

const HomeEdit: React.FC<{}> = () => {
  const { website } = useContext(WebsiteContext);
  const currentUser = getCurrentUser();

  console.log("website", website);

  const [sidebarClass, toggleSidebarClass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [initValues, setInitValues] = useState<{
    name: string;
    descText: string;
  }>({
    name: website.name || "",
    descText: website.descText || "",
  });

  const sendForm = (formValues: { name: string; descText: string }) => {
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
    name: Yup.string().required("This field is required!"),
    descText: Yup.string().required("This field is required!"),
  });

  // useEffect(() => {
  //   const getInitValues = async () => {
  //     const { data } = await getWebsite();

  //     setInitValues({
  //       name: data.name,
  //       descText: data.descText,
  //     });
  //   };

  //   getInitValues();
  // }, []);

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
                <Field name="descText" type="text" className="form-control" />
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

export default HomeEdit;
