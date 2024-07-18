import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "./screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/LogIn");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fst-italic fs-1 " to="#">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse fs-5" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn bg-white text-success mx-2"
                  to="/LogIn"
                  style={{ fontWeight: "bold" }}
                >
                  LogIn
                </Link>
                <Link
                  className="btn bg-white text-success"
                  to="/createuser"
                  style={{ fontWeight: "bold" }}
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2 "
                  style={{ fontWeight: "bold" }}
                  onClick={() => setCartView(true)}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn btn-danger  text-white mx-2 "
                  onClick={handleLogOut}
                  style={{ fontWeight: "bold" }}
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
