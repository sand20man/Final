import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand ms-4" to="/">
        Entertainment Agency
      </Link>
      <button
        className="navbar-toggler me-4"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/entertainers">
              Entertainers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
