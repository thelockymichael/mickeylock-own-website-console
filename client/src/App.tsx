import React from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Main } from "./components/main";

const App: React.FC<{}> = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default App;
