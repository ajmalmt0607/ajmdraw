import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home/Home";

const AppRoute = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default AppRoute;
