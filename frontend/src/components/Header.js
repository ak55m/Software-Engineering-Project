import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/useractions";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      // Navigate to the search page with keyword, latitude, and longitude
      navigate(`/search/${keyword}`);
    } else {
      // Navigate to the home page
      navigate("/");
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {/* Top Header */}
      <div className="Announcement">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center d-md-none">
              <p>This is a Lottery Ticket Purchase System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="d-md-none">
            <div className="row">
              <div className="col-6 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Orders
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="d-none d-md-block">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-12 align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search for Lottery Tickets"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="btn btn-outline-primary">
                    Search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Orders
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                    <div className="d-flex">
                    <Link to="/signup" className="btn btn-outline-primary mr-2">
                      Sign Up
                    </Link>
                    <Link to="/signin" className="btn btn-primary">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
