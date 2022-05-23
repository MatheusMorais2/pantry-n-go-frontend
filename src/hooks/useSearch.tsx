import { useContext } from "react";
import {
  SearchContextInterface,
  SearchContext,
} from "../contexts/SearchContext";

const useSearch = (): SearchContextInterface => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("useSearch must be inside a SearchContext Provider");
  }

  return searchContext;
};

export default useSearch;
