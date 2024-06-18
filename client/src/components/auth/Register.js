import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config";
import { useState, useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const validate = async () => {
      if (localStorage.getItem("token")) {
        navigate('/console');
      }
    };

    validate();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (name.length < 3) {
      setError("Name too short")
      return
    }
    else if (password.length < 6){
      setError("Password, must be greater than 6 characters");
      return
    }
    else if (password !== confirmPassword) {
      setError("Password and Confirm password must be same");
      return;
    }

    try {
      const response = await axiosInstance.post('/api/register', { name, email, password });

      if (response.status === 200) {
        navigate('/login');
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to register.');
      }
      console.error('Failed to register:', err);
    }
  };

  return (
    <div className="mb-5">
      <section className="container mt-3">
        <Link className="brand navbar-brand d-flex align-items-center" to="/home">
          <img
            src={"https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"}
            width={40}
            height={40}
            className="d-inline-block align-top"
            alt=""
          />
          <p className="ml-2 text-bold mb-0">Groove AI</p>
        </Link>
      </section>
      <section id="body" className="container mt-3">
        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-start mt-3">
            <p className="auth-title">
              Create New Account
            </p>
            <p className="already-register">
              Create your new account to continue
            </p>
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
                <h5 className="auth-title mb-4">Create Account</h5>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={() => setError('')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={() => setError('')}
                    min={4}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={() => setError('')}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
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
                  Sign Up
                </button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                <hr style={{color: "black"}}></hr>
                <div className="mt-3">
                  <p className="text-medium">Already have an account?</p>
                  <Link className="btn btn-outline-dark" style={{ width: '100%' }} to="/login">
                    Login
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

export default Register;
