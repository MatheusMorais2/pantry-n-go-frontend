import { createContext, useState } from "react";
import React from "react";

export interface RecipeContextInterface {
  recipeInstructions: any | null;
  setRecipeInstructions: (recipeInstructions: any) => void;
}

export const RecipeContext = createContext<RecipeContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const RecipeProvider = ({ children }: Props): JSX.Element => {
  const [recipeInstructions, setRecipeInstructions] = useState(null);

  return (
    <RecipeContext.Provider
      value={{ recipeInstructions, setRecipeInstructions }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
