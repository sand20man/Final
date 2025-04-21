import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import EntertainersList from './pages/EntertainersList';
import EntertainerDetails from './pages/EntertainerDetails';
import AddEntertainer from './pages/AddEntertainer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/entertainers" element={<EntertainersList />} />
        <Route path="/entertainers/add" element={<AddEntertainer />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
