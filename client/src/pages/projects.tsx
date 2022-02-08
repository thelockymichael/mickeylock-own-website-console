import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";

import styled from "styled-components";

import {
  infoSectColor,
  primaryColor,
  primaryShade,
  primaryText,
  secondaryColor,
  secondaryText,
  tagColor,
} from "../colors/colors";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// Route
import { Link } from "react-router-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ProjectItem } from "../components";

const Wrapper = styled.div`
  height: 100%;
  background-color: ${primaryColor};
`;

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-around;
`;

// My name container & text
const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavBarBack = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const NavBarItem = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem;
    flex: 1;
  }
`;

const NavLink = styled(Link)`
  font-size: 10em;
  color: ${primaryText};
  text-decoration: none;
  text-align: center;
  width: 100%;
  &:hover {
    color: ${primaryColor};
    background-color: ${secondaryColor};
  }
  @media (max-width: 768px) {
    font-size: 4em;
    text-align-last: left;
  }
`;

const Breakline = styled.div`
  height: 0.5rem;
  background-color: ${primaryShade};
`;

const ListContainer = styled.div`
  display: grid;
  margin: 2rem 2rem;
  grid-auto-columns: minmax(60rem, auto);
  grid-template-columns: repeat(auto-fill, minmax(60rem, 1fr));
  grid-gap: 2rem;

  @media (max-width: 768px) {
    grid-auto-columns: minmax(60rem, auto);
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
`;

const ListItemImg = styled.div``;

const Image = styled.img`
  display: block;
  width: 100%;

  /* @media (max-width: 768px) {
    max-width: 100% !important;
  } */
`;

const ListItemRows = styled.div`
  display: flex;
  flex-direction: column;
`;

// TOP
const ListItemTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1.5rem 1.5rem;
`;

const TagItem = styled.div`
  margin: 0.5rem;
  background: ${tagColor};
  color: ${secondaryText};
  padding: 1rem;
  border-radius: 1rem;
  font-size: 2rem;
  text-align: center;
`;

const InfoSection = styled.div`
  background-color: ${infoSectColor};
  width: 100%;
  height: 100%;
`;

const InfoText = styled.p`
  font-size: 1em;
  color: ${primaryText};
  text-align: left;
  padding: 1rem;
`;

const IconContainer = styled.div`
  display: flex;
  padding: 0rem 2rem;
`;

const TitleGithubButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2rem 2rem;
  justify-content: space-between;
`;

const TitleContainer = styled.div``;

const TitleText = styled.p`
  font-size: 2em;
  color: ${primaryText};
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const GitHubButton = styled.div`
  display: flex;
  align-items: center;
  background-color: ${primaryColor};
  border-radius: 2rem;
  width: 100%;
  padding: 1rem;
`;

const GitHubText = styled.p`
  font-size: 2em;
  @media (max-width: 768px) {
    font-size: 0.5em;
  }
`;

const AHref = styled.a`
  color: ${primaryText};
  text-decoration: none;
  text-align: center;
  width: 100%;
  /* &:hover {
    color: ${primaryColor};
    background-color: ${secondaryColor};
  } */
`;

const AboutPage: React.FC<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name}`);
  }, [props.name]);

  return (
    <Wrapper>
      <Container>
        <NavBar>
          <NavBarBack>
            <Link to="/">
              <FontAwesomeIcon
                size="6x"
                color={secondaryColor}
                icon={faArrowLeft}
              />
            </Link>
          </NavBarBack>
          <Breakline />
          <NavBarItem>
            <NavLink to="/about">About</NavLink>
          </NavBarItem>
          <Breakline />
          <NavBarItem>
            <NavLink to="/projects">Projects</NavLink>
          </NavBarItem>
          <Breakline />
        </NavBar>
        <ListContainer>
          <ProjectItem>
            <ListItemImg>
              <Image
                alt="background"
                src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
              />
            </ListItemImg>
            <ListItemRows>
              <ListItemTop>
                <IconContainer>
                  <FontAwesomeIcon
                    size="3x"
                    color={secondaryColor}
                    icon={faCaretDown}
                  />
                </IconContainer>
                <TitleGithubButton>
                  <TitleContainer>
                    <TitleText>VehoGO</TitleText>
                  </TitleContainer>
                  <div>
                    <AHref href="https://github.com/">
                      <GitHubButton>
                        <FontAwesomeIcon
                          size="2x"
                          color={secondaryColor}
                          icon={faGithub}
                        />
                        <GitHubText>GitHub</GitHubText>
                      </GitHubButton>
                    </AHref>
                  </div>
                </TitleGithubButton>
              </ListItemTop>
              <TagContainer>
                <TagItem>React Native</TagItem>
                <TagItem>Firebase</TagItem>
                <TagItem>Google APIs</TagItem>
              </TagContainer>
              <InfoSection>
                <InfoText>
                  Sed eu semper turpis. Mauris felis massa, pretium eu neque
                  interdum, pretium scelerisque nunc. Cras imperdiet sapien ut
                  arcu bibendum, sed lobortis dolor elementum. In auctor eros
                  non lorem aliquam, a sollicitudin risus pharetra. Nam eu risus
                  vehicula, scelerisque eros in, placerat nibh. Donec placerat
                  tellus at augue posuere feugiat. Curabitur eu vulputate
                  sapien, vitae tristique est.
                </InfoText>
              </InfoSection>
            </ListItemRows>
          </ProjectItem>

          <ProjectItem />
          <ProjectItem />
        </ListContainer>
      </Container>
    </Wrapper>
  );
};

export default AboutPage;
