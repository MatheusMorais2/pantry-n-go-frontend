import api from "../services/api";
import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import useSearch from "../hooks/useSearch";
import useUserContext from "../hooks/useUserContext";
import { UserContext } from "../contexts/UserContext";
import { SearchType } from "../contexts/SearchContext";
import { AxiosError } from "axios";
import { PageContainer } from "../styles";
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import IngredientList from "../components/IngredientList";

export default function Pantry() {
  const { token } = useAuth();
  const { setMessage } = useAlert();

  const userContext = useUserContext();
  const { ingredientList, setIngredientList } = userContext;
  console.log("ingredientList: ", ingredientList);

  const searchContext = useSearch();
  const { searchType, setSearchType, results, setResults } = searchContext;

  async function loadPage() {
    if (!token) return;

    try {
      const response = await api.getUserIngredients(token);
      setIngredientList(response);
    } catch (err: Error | AxiosError | any) {
      setMessage(err);
    }
  }

  useEffect(() => {
    loadPage();
  }, [results]);

  return (
    <Page>
      <SearchBar searchTypeProp="ingredient" />
      {results ? <SearchResults /> : <IngredientList />}
    </Page>
  );
}

const Page = styled(PageContainer)`
  height: calc(100vh - 60px);
`;
