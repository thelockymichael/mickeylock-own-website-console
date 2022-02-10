import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [content, setContent] = useState<string>("");

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default HomePage;
