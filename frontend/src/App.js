import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import NotFound from "./NotFound";
import HomeScreen from "./HomeScreen";
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

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<HomeScreen />} />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
