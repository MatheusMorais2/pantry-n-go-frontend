import styled from "styled-components";
import { Link } from "react-router-dom";

const Subtitle = styled.p`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 24px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #9f1919;
  &:visited {
    color: #9f1919;
  }
  &:hover {
    cursor: pointer;
  }
`;

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  /*   justify-content: center; */
  align-items: center;
  flex-direction: column;
  background-color: #fefefe;
`;

const AuthButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DefaultText = styled.p`
  font-family: "Roboto";
  font-weight: 400;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const IndividualResult = styled.div`
  width: 90%;
  min-height: 100px;
  background-color: #9f1919;
  color: #fff;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-radius: 30px;
  -webkit-box-shadow: 0px 4px 9px -5px rgba(0, 0, 0, 0.77);
  box-shadow: 0px 4px 9px -5px rgba(0, 0, 0, 0.77);
  overflow: break-word;
`;

export {
  Subtitle,
  StyledLink,
  PageContainer,
  AuthButtons,
  DefaultText,
  Row,
  IndividualResult,
};
