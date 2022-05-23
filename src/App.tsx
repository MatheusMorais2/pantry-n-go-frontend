import React from "react";
import { createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import AlertProvider from "./contexts/AlertContext";
import UserProvider from "./contexts/UserContext";
import SearchProvider from "./contexts/SearchContext";
import RecipeProvider from "./contexts/RecipeContext";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "@emotion/react";
import Login from "./pages/Login";
import Alert from "./components/Alert";
import { MainApp } from "./components/MainApp";
import Pantry from "./pages/Pantry";
import Recipes from "./pages/Recipes";

const App = (): JSX.Element => {
  const theme = createTheme({
    palette: {
      secondary: { main: "#9f1919" },
      background: { default: "#FAFAFA", paper: "#FAFAFA" },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AlertProvider>
          <AuthProvider>
            <UserProvider>
              <SearchProvider>
                <RecipeProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<SignUp />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="app" element={<MainApp />}>
                        <Route path="/app/pantry" element={<Pantry />} />
                        <Route path="/app/recipes" element={<Recipes />} />
                        {/*                         <Route path="/app/recipes/instructions" element={<RecipeInstructions/>} /> */}
                      </Route>
                    </Routes>
                  </BrowserRouter>
                  <Alert />
                </RecipeProvider>
              </SearchProvider>
            </UserProvider>
          </AuthProvider>
        </AlertProvider>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
