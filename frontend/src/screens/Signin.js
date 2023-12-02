import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../Redux/Actions/useractions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Header from "../components/Header";

const Signin = ({ location, history }) => {  // Use history directly from props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const redirect = location?.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                  <p className="mt-3">
                    No Account? <Link
                      to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
                    >
                    Sign Up
                    </Link>
                  </p>
                  {/* <p className="mt-3">
                    Already have an account? <Link to="/login">Signin</Link>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
