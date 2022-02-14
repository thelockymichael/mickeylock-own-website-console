import React, { useState, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editWebsite, getWebsite } from "../services/editWebsite.service";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBars, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface IProps {
  sidebarClass: boolean;
}

const Sidebar: React.FC<IProps> = ({ sidebarClass }) => {
  return (
    <div className="wrapper">
      <nav className={sidebarClass ? "active" : ""} id="sidebar">
        <div className="sidebar-header">
          <h3>Mickeylock.com</h3>
        </div>

        <ul className="list-unstyled components">
          <li className="active">
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>

          <li>
            <Link to={"/dashboard/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/dashboard/about"}>About</Link>
          </li>
          <li>
            <Link to={"/dashboard/projects"}>Projects</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
