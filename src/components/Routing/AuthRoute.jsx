import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Screens/Login/Login";
import Register from "../Screens/Register/Register";

const AuthRoute = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AuthRoute;
