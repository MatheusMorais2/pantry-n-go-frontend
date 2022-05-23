import useUserContext from "../hooks/useUserContext";
import { Subtitle, Row, IndividualResult } from "../styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Fab } from "@mui/material";
import api, { Ingredient } from "../services/api";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import { useEffect, useState } from "react";

export default function IngredientList() {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const userContext = useUserContext();
  const { ingredientList, setIngredientList } = userContext;
  const [recommendedIngredients, setRecommendedIngredients] = useState<
    Ingredient[] | null
  >(null);
  const [showSugestions, setShowSuggestions] = useState<boolean>(
    !(ingredientList.length > 0)
  );

  useEffect(() => {
    loadRecommendedIngredients();
  }, []);

  async function loadRecommendedIngredients() {
    if (!token) return;
    const recommended = await api.getRecommendedIngredients(token);
    setRecommendedIngredients([...recommended]);
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

  async function removeUserIngredient(ingredientId: number) {
    if (!token) return;

    const newIngredientList = await api.deleteUserIngredient(
      token,
      ingredientId
    );
    setIngredientList(newIngredientList);
  }

  async function changeShowSuggestion() {
    setShowSuggestions(!showSugestions);
    if (!token) return;

    try {
      const results = await api.getUserIngredients(token);
      setIngredientList(results);
    } catch {
      setMessage({ type: "error", text: "Error getting your pantry" });
    }
  }

  if (showSugestions) {
    return (
      <>
        <Row>
          <Subtitle>Ingredients: </Subtitle>
          <AddCircleIcon
            sx={{ color: "#9f1919", fontSize: "36px" }}
            onClick={changeShowSuggestion}
          />
        </Row>
        {ingredientList?.map((elem) => {
          return (
            <IndividualResult key={elem.id}>
              {elem.ingredient.name}
              <CancelIcon onClick={() => removeUserIngredient(elem.id)} />
            </IndividualResult>
          );
        })}
      </>
    );
  } else {
    return (
      <>
        <Row>
          <Subtitle>Sugestions: </Subtitle>
          <Fab
            color="secondary"
            onClick={changeShowSuggestion}
            sx={{ height: "20px", width: "34px" }}
          >
            <CancelIcon />
          </Fab>
        </Row>
        {recommendedIngredients?.map((elem) => {
          return (
            <IndividualResult key={elem.id}>
              {elem.name}
              <CheckIcon
                onClick={() => addUserIngredient(elem.spoonacularId)}
              />
            </IndividualResult>
          );
        })}
      </>
    );
  }
}
