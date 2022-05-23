/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, SxProps, TextField } from "@mui/material";
import useAlert from "../hooks/useAlert";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Form from "../components/Form";
import PasswordInput from "../components/PasswordInput";
import { AlertContextInterface } from "../contexts/AlertContext";
import { ReactComponent as LogoSVG } from "../assets/logo.svg";
import {
  Subtitle,
  StyledLink,
  PageContainer,
  AuthButtons,
  DefaultText,
} from "../styles";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const { setMessage, showInternalError } = useAlert() as AlertContextInterface;
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password || !formData?.confirmPassword) {
      setMessage({ type: "error", text: "All fields must be filled" });
    }

    if (formData?.password !== formData?.confirmPassword) {
      setMessage({ type: "error", text: "Passwords must be equal" });
    }

    try {
      await api.signup(formData);
      setMessage({ type: "success", text: "Signed-up successfully!" });
      navigate("/login");
    } catch (error: Error | AxiosError | any) {
      showInternalError(error);
    }
  }

  const inputStyles: SxProps = {
    width: "100%",
  };

  return (
    <PageContainer>
      <LogoSVG />
      <Form onSubmit={handleSubmit}>
        <Subtitle>Sign-up</Subtitle>
        <TextField
          sx={inputStyles}
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          className="input"
          onChange={handleInputChange}
          value={formData.email}
        />
        <PasswordInput
          name="password"
          label="Password"
          className="input"
          onChange={handleInputChange}
          value={formData.password}
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          className="input"
          onChange={handleInputChange}
          value={formData.confirmPassword}
        />
        <AuthButtons>
          <StyledLink to="/login">
            <DefaultText>To login</DefaultText>
          </StyledLink>
          <Button color="secondary" variant="contained" type="submit">
            Sign-up
          </Button>
        </AuthButtons>
      </Form>
    </PageContainer>
  );
};

export default SignUp;
