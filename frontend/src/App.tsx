/**
 * Main application component that sets up routing and navigation
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import EntertainersList from './pages/EntertainersList';
import EntertainerDetails from './pages/EntertainerDetails';
import AddEntertainer from './pages/AddEntertainer';
import 'bootstrap/dist/css/bootstrap.min.css';

// Main App component that sets up routing
function App() {
  return (
    /* Router component to enable client-side navigation */
    <Router>
      {/* Routes component to define different paths in the application */}
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<LandingPage />} />
        {/* List of all entertainers */}
        <Route path="/entertainers" element={<EntertainersList />} />
        {/* Form to add a new entertainer */}
        <Route path="/entertainers/add" element={<AddEntertainer />} />
        {/* Details page for a specific entertainer */}
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
