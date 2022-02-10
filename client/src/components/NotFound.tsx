import React from "react";
import { Link } from "react-router-dom";
const NotFound: React.FC = () => {
  return (
    <div className="container">
      <header className="jumbotron">
        <h1>404 - Not Found!</h1>
        <Link to="/">Go Home</Link>
      </header>
    </div>
  );
};

export default NotFound;
