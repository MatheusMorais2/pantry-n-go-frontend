import useSearch from "../hooks/useSearch";
import styled from "styled-components";
import { Subtitle, Row, IndividualResult } from "../styles";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import useRecipe from "../hooks/useRecipe";

export function SearchResults() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const searchContext = useSearch();
  const { recipeInstructions, setRecipeInstructions } = useRecipe();
  const { searchType, setSearchType, results, setResults } = searchContext;

  function cancelSearch() {
    setResults(null);
  }

  async function addUserIngredient(id: number) {
    if (!token) return;
    try {
      await api.createUserIngredient(token, id);
      setMessage({ type: "success", text: "Ingredient added to pantry!" });
    } catch {
      setMessage({ type: "error", text: "Error adding ingredient to pantry" });
    }
  }

  async function showRecipeDetails(recipeId: number) {
    if (!token) return;
    try {
      const recipeInstructionsResponse = await api.getRecipeInstructions(
        token,
        recipeId
      );
      setRecipeInstructions(recipeInstructionsResponse);
    } catch {
      setMessage({ type: "error", text: "Error getting recipe instructions" });
    }
    console.log("chegou aqui");
  }

  return (
    <>
      <Row>
        <Subtitle>Results:</Subtitle>
        <Fab
          color="secondary"
          onClick={cancelSearch}
          sx={{ height: "20px", width: "34px" }}
        >
          <CancelIcon />
        </Fab>
      </Row>
      {results?.map((elem) => {
        return (
          <IndividualResult key={elem.id}>
            {elem.name}
            {searchType === "ingredient" ? (
              <AddIcon onClick={() => addUserIngredient(elem.id)} />
            ) : (
              <AddIcon onClick={() => showRecipeDetails(elem.id)} />
            )}
          </IndividualResult>
        );
      })}
    </>
  );
}
