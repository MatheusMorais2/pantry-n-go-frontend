import api from "../services/api";
import { TextField, InputAdornment } from "@mui/material";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAlert from "../hooks/useAlert";
import useSearch from "../hooks/useSearch";
import useRecipe from "../hooks/useRecipe";
import useUserContext from "../hooks/useUserContext";
import SendIcon from "@mui/icons-material/Send";
import { AxiosError } from "axios";
import { SearchContext, SearchType } from "../contexts/SearchContext";

interface Props {
  searchTypeProp: SearchType;
}

interface Recipe {
  id: number;
  title: string;
  imageType: string;
  image: string;
}

export function SearchBar({ searchTypeProp }: Props) {
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const searchContext = useSearch();
  const { ingredientList } = useUserContext();
  const { recipeInstructions, setRecipeInstructions } = useRecipe();
  const { searchType, setSearchType, results, setResults } = searchContext;
  const [search, SetSearch] = useState<string>("");

  useEffect(() => {
    setSearchType(searchTypeProp);
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    SetSearch(e.target.value);
  }

  async function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    setRecipeInstructions(null);
    if (!token) return;

    try {
      let data;
      if (searchTypeProp === "ingredient") {
        data = await api.searchIngredient(token, search);
        setResults(data);
      } else {
        data = await api.queryRecipes(token, search);
        console.log("data:", data);
        const recipesArray = data.results.map((elem: Recipe) => {
          return {
            id: elem.id,
            name: elem.title,
          };
        });

        setResults(recipesArray);
      }

      console.log("results: ", data);

      setMessage({
        type: "success",
        text: `Search for ${search} complete`,
      });
    } catch (error: Error | AxiosError | any) {
      setMessage({
        type: "error",
        text: "Error searching database",
      });
    }
  }

  return (
    <TextField
      sx={{
        marginX: "auto",
        marginBottom: "25px",
        width: "80%",
      }}
      color={"secondary"}
      label={`Search for ${searchType}`}
      onChange={handleChange}
      value={search}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon onClick={handleSearchSubmit} />
          </InputAdornment>
        ),
      }}
    />
  );
}
