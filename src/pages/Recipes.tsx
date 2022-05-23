import api from "../services/api";
import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import useSearch from "../hooks/useSearch";
import useRecipe from "../hooks/useRecipe";
import useUserContext from "../hooks/useUserContext";
import { AxiosError } from "axios";
import { PageContainer } from "../styles";
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { SearchResults } from "../components/SearchResults";
import RecipeSuggestions from "../components/RecipeSuggestions";

export default function Recipes() {
  const { token } = useAuth();
  const { recipeInstructions, setRecipeInstructions } = useRecipe();
  const searchContext = useSearch();
  const { searchType, setSearchType, results, setResults } = searchContext;

  return (
    <Page>
      <SearchBar searchTypeProp="recipe" />
      {results ? <SearchResults /> : <RecipeSuggestions />}
    </Page>
  );
}

const Page = styled(PageContainer)`
  height: calc(100vh - 60px);
`;
