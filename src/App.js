import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AppRoute from "./components/Routing/AppRoute";
import AuthRoute from "./components/Routing/AuthRoute";

const App = () => {
  const userVerfied = useSelector((state) => state.userState.user);

  return (
    <MainDiv className="App">
      {userVerfied ? <AppRoute /> : <AuthRoute />}
    </MainDiv>
  );
};

const MainDiv = styled.div`
  background-color: #1d1d1d;
  height: 100vh;
`;

export default App;
