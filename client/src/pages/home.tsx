import React, { useEffect, useContext, useState } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
import { Link } from "react-router-dom";

import * as websiteServices from "../services/website";

import styled from "styled-components";

import { primaryColor, primaryText, secondaryColor } from "../colors/colors";
import { useWebsiteContext } from "../hooks/website";
import { WebsiteContext } from "../contexts/website";

const Wrapper = styled.div`
  height: 100%;
  background-color: ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  height: 50rem;
  width: 100rem;
  justify-content: space-around;
  flex-direction: column;
`;

const NavLink = styled(Link)`
  font-size: 10em;
  color: ${primaryText};
  text-decoration: none;
  &:hover {
    color: ${primaryColor};
    background: ${secondaryColor};
  }
  @media (max-width: 768px) {
    font-size: 10em;
  }
`;

// My name container & text
const NameContainer = styled.div`
  height: "40%";
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const NameText = styled.p`
  font-size: 14em;
  @media (max-width: 768px) {
    font-size: 10em;
  }
`;

const DescText = styled.p`
  font-size: 2em;
`;

/* END */

const GroupContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
`;

const HomePage: React.FC<IPage> = (props) => {
  // TODO
  // 1. Update name
  // 2. Update Desc Text

  const [loading, setLoading] = useState<Boolean>(true);

  const { website } = useContext(WebsiteContext);

  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <Wrapper>
      <Container>
        <NameContainer>
          <NameText>{website.name}</NameText>
          <DescText>{website.descText}</DescText>
          {/* <NameText>{website.name}</NameText> */}
          {/* <DescText>{website.descText}</DescText> */}
        </NameContainer>
        <GroupContainer>
          <div>
            <NavLink to="/about"> About </NavLink>
          </div>
          <div>
            <NavLink to="/projects"> Projects </NavLink>
          </div>
        </GroupContainer>
      </Container>
    </Wrapper>
  );
};

export default HomePage;
