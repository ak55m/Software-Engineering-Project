import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./screens/Signin.js";
import Signup from "./screens/Signup.js";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";

// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
