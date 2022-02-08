import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";

import styled from "styled-components";
import {
  primaryColor,
  secondaryColor,
  secondaryShade,
  secondaryText,
} from "./colors/colors";
import routes from "./config/routes";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Website service
import { WebsiteContext } from "./contexts/website";
import * as websiteServices from "./services/website";
import { IWebsite } from "./models";

const FooterContainer = styled.div`
  flex: 0 1 40px;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${secondaryColor};
  max-width: 100%;
  height: 5rem;
`;

const NameContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const IconContainer = styled.div`
  display: flex;
  width: 16rem;
  height: 100%;
  justify-content: space-around;
`;

const FooterText = styled.div`
  color: ${secondaryText};
  font-size: 2.5em;
`;

const Breakline = styled.div`
  height: 2px;
  background-color: ${secondaryShade};
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1 1 auto;
  background-color: ${primaryColor};
`;

const App: React.FC<{}> = () => {
  const [website, setWebsite] = useState<IWebsite>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getWebsite = async () => {
      await websiteServices
        .getAll()
        .then((response: any) => {
          setWebsite(response.data);
          setLoading(false);
        })
        .catch((error: Error) => {
          console.log(error);
        });
    };
    getWebsite();
  }, []);

  return (
    <Router>
      <WebsiteContext.Provider value={{ website }}>
        {!loading && (
          <Wrapper>
            <Content>
              <Switch>
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      render={(props: RouteComponentProps<any>) => (
                        <route.component
                          name={route.name}
                          {...props}
                          {...route.props}
                        />
                      )}
                    />
                  );
                })}
              </Switch>
            </Content>
            <FooterContainer>
              <FooterDiv>
                <NameContainer>
                  <FooterText>You can find me at </FooterText>
                </NameContainer>
              </FooterDiv>
              <FooterDiv>
                <IconContainer>
                  <a
                    target="!blank"
                    href="https://www.instagram.com/mihkelilokki/"
                  >
                    <FontAwesomeIcon
                      size="4x"
                      color="#FFF"
                      icon={faInstagram}
                    />
                  </a>
                  <a target="!blank" href="https://github.com/thelockymichael">
                    <FontAwesomeIcon size="4x" color="#FFF" icon={faGithub} />
                  </a>
                  <a target="!blank" href="mailto:michael.rich.lock@gmail.com">
                    <FontAwesomeIcon size="4x" color="#FFF" icon={faEnvelope} />
                  </a>
                </IconContainer>
              </FooterDiv>
              <Breakline />
              <FooterDiv>
                <NameContainer>
                  <FooterText>© 2021 Michael Lock</FooterText>
                </NameContainer>
              </FooterDiv>
            </FooterContainer>
          </Wrapper>
        )}
      </WebsiteContext.Provider>
    </Router>
  );
};

export default App;
