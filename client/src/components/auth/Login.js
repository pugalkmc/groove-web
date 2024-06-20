import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/console');
      }
    };

    validate();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });

      // Check the status code
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        navigate('/console');
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Failed to login");
      }
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="mb-5">
      <section className="container mt-3">
        <Link className="brand navbar-brand d-flex align-items-center" to="/home">
          <img
            src="https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"
            width={40}
            height={40}
            className="d-inline-block align-top"
            alt=""
          />
          <p className="ml-2 text-bold mb-0">Groove AI</p>
        </Link>
      </section>
      <section id="body" className="container mt-4">
        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-start mt-3">
            <h2 className="auth-title">Login</h2>
            <p className="already-register">Sign in to continue</p>
            <div
              style={{ height: 2, width: "20%", backgroundColor: "black" }}
              className="mt-4"
            ></div>
            <div className="mt-4 empower-text">
              Empower Your Community with Groove Bot!
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="create-account-container p-4">
              <form onSubmit={handleSubmit}>
                <h5 className="auth-title mb-4">Login</h5>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={() => setError('')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    onChange={() => setError('')}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-submit w-100 mt-3"
                  disabled={error !== ''}
                >
                  Sign In
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <hr style={{color: "black"}}></hr>
                <div className="mt-3">
                  <p className="text-medium">New to Groove?</p>
                  <Link className="btn btn-outline-dark" style={{ width: '100%' }} to="/register">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default Login;