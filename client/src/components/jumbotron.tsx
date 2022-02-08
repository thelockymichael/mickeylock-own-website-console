import React from "react";
export const Jumbotron = () => {
  return (
    <section className="jumbotron text-center mb-0 bg-white">
      <div className="container">
        <h1 className="jumbotron-heading">Album example</h1>
        <p className="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don't simply skip over it entirely.
        </p>
        <p>
          <a href="#" className="btn btn-primary m-2">
            Main call to action
          </a>
          <a href="#" className="btn btn-secondary m-2">
            Secondary action
          </a>
        </p>
      </div>
    </section>
  );
};
