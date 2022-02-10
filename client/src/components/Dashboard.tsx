import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Dashboard: React.FC = () => {
  const currentUser = getCurrentUser();

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
            <h3>
              <strong>{currentUser?.user.fullName}</strong> Dashboard
            </h3>
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
