import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Navbar(props) {

  const [user, setUser] = useState({});

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/getUserByUsername", 
          {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log("error in navbar: ", error);
      }

    } ; fetchUser();

  },[]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#9a8100" }}
    >
      <div className="container-fluid">
        <a className="brandLogo navbar-brand" href="/home">
          <h3>
            <b>Lehza</b>
          </h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item dropdown px-3">
              <a
                className="nav-a dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sarees
              </a>
              <ul
                className="dropdown-menu"
                style={{ backgroundColor: "#9a8100" }}
              >
                <li>
                  <a className="dropdown-item" href="/weddingSarees">
                    Wedding Sarees
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/banarasiSarees">
                    Banarasi Sarees
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/festiveSarees">
                    Festive Sarees
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/partyWearSarees">
                    Party Wear Sarees
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/bridalSarees">
                    Bridal Sarees
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/allSarees">
                    All Sarees
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown px-3">
              <a
                className="nav-a dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Lehenga
              </a>
              <ul
                className="dropdown-menu"
                style={{ backgroundColor: "#9a8100" }}
              >
                <li>
                  <a className="dropdown-item" href="/">
                    Designer Lehenga Choli
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Bridal Lehenga Choli
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Wedding Lehenga Choli
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Navratri Lehenga Choli
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    All Lehengas
                  </a>
                </li>
              </ul>
            </li>
            
          </ul>

            <li className="nav-item dropdown px-3">
              <a
                className="nav-a dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
              {user.username ? user.username : "login"}
              </a>
              <ul
                className="dropdown-menu"
                style={{ backgroundColor: "#9a8100" }}
              >
                <li>
                  <a className="dropdown-item" href="/Orders">
                    Your Orders
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href="/" onClick={()=>{localStorage.clear()}}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          

          <a href="/cart">
            <i
              type="button"
              className="bi bi-cart3 px-3"
              style={{ color: "black" }}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Cart"
            ></i>
          </a>

          {props.mode === "light" ? (
            <i
              className="bi bi-moon-stars-fill px-3"
              style={{ color: "black" }}
              onClick={props.toggleMode}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Turn off the light"
            ></i>
          ) : (
            <i
              className="bi bi-sun-fill px-3"
              style={{ color: "black", fontSize: "large" }}
              onClick={props.toggleMode}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Turn on the light"
            ></i>
          )}
        </div>
      </div>
    </nav>
  );
}
