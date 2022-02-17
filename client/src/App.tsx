import React, { useState, useEffect } from "react";
import { Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import * as AuthService from "./services/auth.service";
import { BrowserRouter } from "react-router-dom";

import EventBus from "./common/EventBus";
import ICurrentUser from "./types/currentUser.type";
import routes from "./config/routes";
import AppRoute from "./components/AppRoute";
import { WebsiteContext } from "./contexts/website";
import IWebsite from "./types/website.type";
import { getWebsite, initWebsite } from "./services/editWebsite.service";

const App: React.FC = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ICurrentUser | undefined>({
    authToken: "",
    user: {
      fullName: "",
      about: "",
      profileImage: "",
      projects: [],
    },
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const [website, setWebsite] = useState<IWebsite>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWebsiteData = async () => {
      await getWebsite()
        .then((response: any) => {
          setWebsite(response.data);
          setLoading(false);
        })
        .catch(async (error: Error) => {
          const initWebsiteData = await initWebsite();

          setWebsite(initWebsiteData);

          console.log(error);
          setLoading(false);
        });
    };
    getWebsiteData();
  }, []);

  return (
    <BrowserRouter>
      <WebsiteContext.Provider value={{ website }}>
        {!loading && (
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={"/"} className="navbar-brand">
                Mickeylock.com
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </li>

                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                      Moderator Board
                    </Link>
                  </li>
                )}

                {showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                )}
              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/dashboard"} className="nav-link">
                      {currentUser?.user.fullName}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </nav>

            <div className="container mt-3">
              <Switch>
                {routes.map((route) => (
                  <AppRoute
                    exact={route.exact}
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  />
                ))}
              </Switch>
            </div>
          </div>
        )}
      </WebsiteContext.Provider>
    </BrowserRouter>
  );
};

export default App;
