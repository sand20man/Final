import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="container-fluid vh-100 p-0 d-flex flex-column">
      <Navbar />
      <div className="flex-grow-1 d-flex align-items-center justify-content-center bg-light">
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
