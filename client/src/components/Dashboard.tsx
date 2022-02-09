import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Dashboard: React.FC = () => {
  console.log("AM I IN DASBOARD? ?");

  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser?.user.fullName}</strong> Dashboard
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser?.authToken.substring(0, 20)} ...{" "}
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
  );
};

export default Dashboard;
