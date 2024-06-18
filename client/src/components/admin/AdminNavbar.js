import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(location)
    if (location.pathname === '/console'){
      navigate('/console/project');
    }
  })

  const logout = ()=> {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <header className="bg-white shadow-sm w-100 h-100">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link className="navbar-brand d-flex align-items-center" to={"/home"}>
          <img
            src={
              "https://i.ibb.co/3cqXBWg/avatar6183774686-removebg-preview.png"
            }
            width={40}
            height={40}
            className="d-inline-block align-top"
            alt=""
          />
          <span className="ml-2">Groove AI</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link w-100 h-100" to={"/console"}>
                Console
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link w-100 h-100" to={"/console/account"}>
                Account
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link w-100 h-100" to={"/console/faq"}>
                FAQ
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-end ml-auto nav-item button-hover-effect" onClick={logout} style={{ width: 'fit-content' }}>
            <Link className="nav-link w-100 h-100" to={'/login'}>
                <i className="fas fa-sign-out-alt mr-1"> Logout</i>
            </Link>
        </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;
