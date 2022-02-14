import React, { useState, createContext } from "react";
import IWebsite from "../types/website.type";

export interface IWebsiteContext {
  website: IWebsite;
  setWebsite?: (website: IWebsite) => void;
}

const defaultState = {
  website: {},
  setWebsite: () => {},
};

const WebsiteContext = createContext<IWebsiteContext>(defaultState);

const WebsiteProvider: React.FC = ({ children }) => {
  const [website, setWebsite] = useState<IWebsite>(defaultState.website);

  return (
    <WebsiteContext.Provider
      value={{
        website,
        setWebsite,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export { WebsiteContext, WebsiteProvider };
