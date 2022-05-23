import { useContext } from "react";
import {
  RecipeContext,
  RecipeContextInterface,
} from "../contexts/RecipeContext";

export default function useRecipe(): RecipeContextInterface {
  const recipeContext = useContext(RecipeContext);
  if (!recipeContext) {
    throw new Error("useRecipe must be used inside a RecipeContext Provider");
  }

  return recipeContext;
}
