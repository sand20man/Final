import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/main.css';

export default function LandingPage() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="landing-content">
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4">
            Welcome to the Entertainment Agency
          </h1>
          <p className="lead mb-5">
            Discover and book the best entertainers for your events. Browse our
            talented performers, view their booking history, and find the
            perfect match for your occasion.
          </p>
          <Link to="/entertainers" className="btn btn-primary btn-lg px-5">
            View Entertainers
          </Link>
        </div>
      </div>
    </div>
  );
}
