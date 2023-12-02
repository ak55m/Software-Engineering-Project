import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

function PrivateRouter({ element: Element, ...rest }) {
  const token = window.localStorage.getItem("userInfo");

  return (
    <Route
      {...rest}
      element={(props) => {
        return token ? <Element {...props} /> : <Navigate to="/" />;
      }}
    />
  );
}

export default PrivateRouter;
