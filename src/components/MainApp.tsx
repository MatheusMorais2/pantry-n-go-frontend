import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/headerLogo.svg";
import useAuth from "../hooks/useAuth";
import { AuthContextInterface } from "../contexts/AuthContext";
import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { DefaultText } from "../styles";
import useSearch from "../hooks/useSearch";

interface Props {
  redirectPath?: string;
}

export function MainApp({ redirectPath = "/login" }: Props) {
  const navigate = useNavigate();
  const { token, signout } = useAuth();
  const userContext = useContext(UserContext);
  const searchContext = useSearch();
  const { searchType, setSearchType, results, setResults } = searchContext;

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  function handleSignout() {
    navigate("/login");
    signout();
  }

  function clearResults() {
    setResults(null);
  }

  return (
    <Container>
      <Header>
        <StyledLink onClick={clearResults} to="/app/pantry">
          Pantry
        </StyledLink>
        <StyledLink onClick={clearResults} to="/app/recipes">
          Go
        </StyledLink>
        <Logout onClick={handleSignout} />
      </Header>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  background-color: #9f1919;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  -webkit-box-shadow: 0px 2px 7px 3px rgba(0, 0, 0, 0.49);
  box-shadow: 0px 2px 7px 3px rgba(0, 0, 0, 0.49);
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  font-family: "Kavoon", cursive;
  font-size: 30px;
  color: #fff;
  text-decoration: none;
`;

const Logout = styled(LogoutIcon)`
  height: 100%;
  color: #fff;
  :hover {
    cursor: pointer;
  }
`;
