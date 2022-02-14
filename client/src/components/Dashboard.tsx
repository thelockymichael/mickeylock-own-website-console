import React, { useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  const [sidebarClass, toggleSidebarClass] = useState<boolean>(false);

  const currentUser = getCurrentUser();

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
          <p>
            <strong>Token:</strong> {currentUser?.authToken.substring(0, 20)}{" "}
            ...{" "}
            {currentUser?.authToken.substr(currentUser.authToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong> {currentUser?.user._id}
          </p>
          <p>{/* <strong>Email:</strong> {currentUser?.user.email} */}</p>
          <strong>Authorities:</strong>
          {/* <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => (
            <li key={index}>{role}</li>
          ))}
      </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
