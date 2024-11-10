import React, { useEffect } from "react";
import "./ConsolePage.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { validate } from "../auth/config";

const AdminConsole = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    validate(navigate);
  }, [navigate]);

  return (
    <div className="console-page">
      <div className="container-lg pt-5">
      <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-3 pt-4">
          <nav>
            <p className="pb-1 pt-3 text-xl text-center">Bot Console</p>
            <div className="option-item-container">
              <Link
                to="/console/project"
                className={`option-item ${
                  location.pathname === "/console/project" ? "nav-active" : ""
                }`}
              >
                <p>Details</p>
                <div
                  className={`active-stick ${
                    location.pathname === "/console/project"
                      ? "nav-active-stick"
                      : ""
                  }`}
                ></div>
              </Link>
            </div>
            <div className="option-item-container">
              <Link
                to="/console/source"
                className={`option-item ${
                  location.pathname === "/console/source" ? "nav-active" : ""
                }`}
              >
                <p>Source</p>
                <div
                  className={`active-stick ${
                    location.pathname === "/console/source"
                      ? "nav-active-stick"
                      : ""
                  }`}
                ></div>
              </Link>
            </div>
            <div className="option-item-container">
              <Link
                to="/console/control"
                className={`option-item ${
                  location.pathname === "/console/control" ? "nav-active" : ""
                }`}
              >
                <p>Control</p>
                <div
                  className={`active-stick ${
                    location.pathname === "/console/control"
                      ? "nav-active-stick"
                      : ""
                  }`}
                ></div>
              </Link>
            </div>
            <div className="option-item-container">
              <Link
                to="/console/playground"
                className={`option-item ${
                  location.pathname === "/console/playground" ? "nav-active" : ""
                }`}
              >
                <p>Playground</p>
                <div
                  className={`active-stick ${
                    location.pathname === "/console/playground"
                      ? "nav-active-stick"
                      : ""
                  }`}
                ></div>
              </Link>
            </div>
            <div className="option-item-container">
              <Link
                to="/console/expert"
                className={`option-item ${
                  location.pathname === "/console/expert" ? "nav-active" : ""
                }`}
              >
                <p>Expert</p>
                <div
                  className={`active-stick ${
                    location.pathname === "/console/expert"
                      ? "nav-active-stick"
                      : ""
                  }`}
                ></div>
              </Link>
            </div>
          </nav>
        </div>
        <div className="col-lg-10 col-md-9 col-sm-9">
          <Outlet />
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminConsole;
