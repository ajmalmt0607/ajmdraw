import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../../../assets/AJM.png";
import { Link } from "react-router-dom";
import { customFetch } from "../../../utils/data";
import { loginUser } from "../../../Redux/user/userSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);
      dispatch(loginUser(response.data));
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";
      setError(errorMessage);
    }
  };

  return (
    <Parent>
      <MainForm>
        <Form onSubmit={handleSubmit}>
          <AjmLogoDiv>
            <AjmLogo src={logo2} alt="logo" />
          </AjmLogoDiv>
          <InputTag type="email" placeholder="Email" name="identifier" />
          <InputTag type="password" placeholder="Password" name="password" />
          <LoginButton type="submit">Login</LoginButton>
          {error && <FormPara className="error-message">{error}</FormPara>}
          <FormPara>
            Not a member yet?{" "}
            <RegisterLink to={"/register"}>Register</RegisterLink>
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
const LoginButton = styled.button`
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
const RegisterLink = styled(Link)`
  color: rgb(172, 171, 171);
`;

export default Login;
