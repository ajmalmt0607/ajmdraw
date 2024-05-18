import React, { useState } from "react";
import logo2 from "../../../assets/AJM.png";
import { Link, useNavigate } from "react-router-dom";
import { customFetch } from "../../../utils/data";
import styled from "styled-components";

const Register = () => {
  const navigate = useNavigate();
  const [regError, setRegisterError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local/register", data);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      setRegisterError(errorMessage);
      return null;
    }
  };
  return (
    <Parent>
      <MainForm>
        <Form onSubmit={handleSubmit} method="post">
          <AjmLogoDiv>
            <AjmLogo src={logo2} alt="logo" />
          </AjmLogoDiv>
          <InputTag type="text" placeholder="username" name="username" />
          <InputTag type="email" placeholder="email" name="email" />
          <InputTag type="password" placeholder="password" name="password" />
          <RegisterButton type="submit">Register</RegisterButton>
          <FormParaErr>{regError}</FormParaErr>
          <FormPara>
            Already a Member? <LoginLink to={"/"}>Login</LoginLink>
          </FormPara>
        </Form>
      </MainForm>
    </Parent>
  );
};

const Parent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 200px 0;
`;
const MainForm = styled.div`
  padding: 20px 50px;
  width: 400px;
  background-color: #424242;
  border-radius: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const AjmLogoDiv = styled.div`
  width: 90px;
  height: 20px;
  margin: 0 auto;
  margin-bottom: 15px;
`;
const AjmLogo = styled.img`
  width: 100%;
`;
const InputTag = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  border: none;
`;
const RegisterButton = styled.button`
  padding: 8px 5px;
  background-color: rgb(0, 0, 173);
  border: none;
  color: white;
  cursor: pointer;
`;
const FormPara = styled.p`
  color: white;
  font-size: 14px;
  margin-top: 10px;
`;
const FormParaErr = styled.p`
  color: white;
  font-size: 14px;
  margin-top: 10px;
  color: red;
`;
const LoginLink = styled(Link)`
  color: rgb(172, 171, 171);
`;

export default Register;
