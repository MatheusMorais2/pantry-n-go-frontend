import { createContext, useState } from "react";
import React from "react";

interface Ingredient {
  id: number;
  name: string;
  spoonacularId: number;
}

export interface UserIngredient {
  id: number;
  ingredientId: number;
  userId: number;
  ingredient: Ingredient;
}

export interface UserContextInterface {
  username: string | null;
  setUsername: (name: string) => void;
  ingredientList: UserIngredient[];
  setIngredientList: (ingredientList: UserIngredient[]) => void;
}

export const UserContext = createContext<UserContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props): JSX.Element => {
  const [username, setUsername] = useState<string | null>(null);
  const [ingredientList, setIngredientList] = useState<UserIngredient[]>([]);

  return (
    <UserContext.Provider
      value={{ username, setUsername, ingredientList, setIngredientList }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
