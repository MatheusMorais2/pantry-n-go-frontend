/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, TextField, SxProps } from "@mui/material";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import { AlertContextInterface } from "../contexts/AlertContext";
import { AuthContextInterface } from "../contexts/AuthContext";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import { ReactComponent as LogoSVG } from "../assets/logo.svg";
import {
  Subtitle,
  StyledLink,
  PageContainer,
  AuthButtons,
  DefaultText,
} from "../styles";

const inputStyles: SxProps = {
  width: "100%",
};

interface FormData {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const { signin } = useAuth() as AuthContextInterface;
  const { setMessage, showInternalError } = useAlert() as AlertContextInterface;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password) {
      setMessage({ type: "error", text: "All fields must be filled" });
      return;
    }

    const { email, password } = formData;

    try {
      const {
        data: { token },
      } = await api.signin({ email, password });
      signin(token);
      navigate("/app/pantry");
    } catch (error: Error | AxiosError | any) {
      showInternalError(error);
    }
  }

  return (
    <PageContainer>
      <LogoSVG />
      <Form onSubmit={handleSubmit}>
        <Subtitle>Login</Subtitle>
        <TextField
          name="email"
          sx={inputStyles}
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.email}
        />
        <PasswordInput
          className="input"
          name="password"
          label="Senha"
          onChange={handleInputChange}
          value={formData.password}
        />
        <AuthButtons>
          <StyledLink to="/">
            <DefaultText>To Sign-up</DefaultText>
          </StyledLink>
          <Button color="secondary" variant="contained" type="submit">
            Login
          </Button>
        </AuthButtons>
      </Form>
    </PageContainer>
  );
};

export default Login;
