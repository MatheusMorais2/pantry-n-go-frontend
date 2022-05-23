import api from "../services/api";
import { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import useSearch from "../hooks/useSearch";
import useRecipe from "../hooks/useRecipe";
import useUserContext from "../hooks/useUserContext";
import { AxiosError } from "axios";
import { PageContainer } from "../styles";
import styled from "styled-components";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { Subtitle, Row, IndividualResult } from "../styles";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

export default function RecipeSuggestions() {
  const { token } = useAuth();
  const { recipeInstructions, setRecipeInstructions } = useRecipe();
  const searchContext = useSearch();
  const { ingredientList } = useUserContext();
  const { setMessage } = useAlert();
  const { searchType, setSearchType, results, setResults } = searchContext;
  const [suggestions, setSuggetions] = useState([]);

  async function loadSuggestions() {
    if (!token) return;
    if (recipeInstructions) return;
    const recipes = await api.searchRecipesByIngredient(token, ingredientList);
    const editedRecipes = recipes.map((elem: any) => {
      return { name: elem.title, id: elem.id };
    });
    console.log("editedRecipes: ", editedRecipes);
    setSuggetions(editedRecipes);
  }

  async function showRecipeDetails(recipeId: number, recipeName: string) {
    setSuggetions([]);
    if (!token) return;
    try {
      const recipeInstructionsResponse = await api.getRecipeInstructions(
        token,
        recipeId
      );
      console.log("recipeInstructionsResponse", recipeInstructionsResponse);
      setRecipeInstructions({
        recipe: recipeInstructionsResponse,
        name: recipeName,
      });
    } catch {
      setMessage({ type: "error", text: "Error getting recipe instructions" });
    }
    console.log("chegou aqui");
  }

  useEffect(() => {
    try {
      loadSuggestions();
    } catch {
      setMessage({ type: "error", text: "Error getting suggested recipes" });
    }
  }, []);

  function hideInstructions() {
    setRecipeInstructions(false);
    loadSuggestions();
  }

  if (suggestions.length > 0) {
    return (
      <>
        <Row>
          <Subtitle>Suggestions:</Subtitle>
        </Row>
        {suggestions?.map((elem: any) => {
          return (
            <IndividualResult key={elem.id}>
              {elem.name}

              <AddIcon onClick={() => showRecipeDetails(elem.id, elem.name)} />
            </IndividualResult>
          );
        })}
      </>
    );
  } else if (recipeInstructions) {
    return (
      <>
        <Row>
          {" "}
          <Subtitle>{recipeInstructions.name}</Subtitle>
          <Fab
            color="secondary"
            onClick={() => {
              setRecipeInstructions(false);
              hideInstructions;
            }}
            sx={{ height: "30px", width: "34px" }}
          >
            <CancelIcon />
          </Fab>
        </Row>
        <InstructionsBody>
          <Subtitle>Ingredients:</Subtitle>
          {recipeInstructions.recipe[0].steps
            .map((elem: any, index: number) => {
              const list = elem.ingredients
                .map((elem: any) => elem.name)
                .join(", ");
              console.log("list", list);
              return list;
            })
            .join(", ")}{" "}
          <Subtitle>Steps:</Subtitle>
          {recipeInstructions.recipe[0].steps.map(
            (elem: any, index: number) => {
              return (
                <>
                  {`${index + 1} - ${elem.step}`}
                  <br />
                </>
              );
            }
          )}
        </InstructionsBody>
      </>
    );
  } else {
    return <>Loading...</>;
  }
}

const InstructionsBody = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #9f1919;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;
