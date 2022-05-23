import { createContext, useState } from "react";

export type SearchType = "ingredient" | "recipe";

export interface SearchContextInterface {
  searchType: SearchType | null;
  setSearchType: (type: SearchType) => void;
  results: any[] | null;
  setResults: (results: any[] | null) => void;
}

export const SearchContext = createContext<SearchContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const SearchProvider = ({ children }: Props): JSX.Element => {
  const [searchType, setSearchType] = useState<SearchType | null>(null);
  const [results, setResults] = useState<any[] | null>(null);

  return (
    <SearchContext.Provider
      value={{ searchType, setSearchType, results, setResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
