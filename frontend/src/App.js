import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Login from "./screens/login";
import Register from "./screens/register";
import NotFound from "./screens/NotFound";
import HomeScreen from "./screens/HomeScreen";
import PrivateRoute from "./PrivateRouter";

// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" component={NotFound} />
        {/* <PrivateRoute path="/home" component={HomeScreen} /> */}


      </Routes>
    </Router>
  );
};

export default App;
