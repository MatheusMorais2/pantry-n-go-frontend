import axios, { AxiosResponse } from "axios";
import { UserIngredient } from "../contexts/UserContext";

const baseAPI = axios.create({
  baseURL: "http://localhost:5000/",
});

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInData {
  email: string;
  password: string;
}

export interface Ingredient {
  id: number;
  name: string;
  spoonacularId: number;
}

async function signup(signupData: SignupData): Promise<void> {
  await baseAPI.post("/auth/sign-up", signupData);
}

async function signin(signinData: SignInData): Promise<AxiosResponse> {
  return await baseAPI.post("/auth/sign-in", signinData);
}

async function getUserIngredients(token: string) {
  const search = await baseAPI.get("/ingredient/user", getConfig(token));
  return search.data;
}

async function createUserIngredient(token: string, spoonacularId: number) {
  const data = { spoonacularId: spoonacularId };
  return await baseAPI.post("/ingredient/user", data, getConfig(token));
}

async function searchIngredient(token: string, ingredient: string) {
  const search = await baseAPI.get(
    `/ingredient/search/${ingredient}`,
    getConfig(token)
  );
  return search.data.results;
}

async function deleteUserIngredient(token: string, userIngredientId: number) {
  const ingredientList = await baseAPI.delete(
    `/ingredient/user/${userIngredientId}`,
    getConfig(token)
  );
  return ingredientList.data;
}

async function getRecommendedIngredients(token: string): Promise<Ingredient[]> {
  const ingredientList = await baseAPI.get(
    "/ingredient/recommended",
    getConfig(token)
  );
  return ingredientList.data;
}

async function searchRecipesByIngredient(
  token: string,
  ingredientList: UserIngredient[]
) {
  const editedIngredientList = ingredientList
    .map((elem: UserIngredient) => {
      return elem.ingredient.name;
    })
    .join(",+")
    .toLowerCase();

  const recipeList = await baseAPI.get(
    `/recipes/ingredient/${JSON.stringify(editedIngredientList)}`,
    getConfig(token)
  );
  return recipeList.data;
}

async function queryRecipes(token: string, query: string) {
  const recipeList = await baseAPI.get(
    `/recipes/search/${query}`,
    getConfig(token)
  );
  return recipeList.data;
}

async function getRecipeInstructions(token: string, recipeId: number) {
  const recipeInstructions = await baseAPI.get(
    `/recipes/instructions/${recipeId}`,
    getConfig(token)
  );
  return recipeInstructions.data;
}

export default {
  signup,
  signin,
  getUserIngredients,
  createUserIngredient,
  searchIngredient,
  deleteUserIngredient,
  getRecommendedIngredients,
  searchRecipesByIngredient,
  queryRecipes,
  getRecipeInstructions,
};
