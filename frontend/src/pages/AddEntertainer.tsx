/**
 * Component for adding a new entertainer to the system
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { entertainerApi, Entertainer } from '../api/entertainerApi';
import '../styles/main.css';

export default function AddEntertainer() {
  /* Navigation hook for redirecting after submission */
  const navigate = useNavigate();

  /* State management for form data and error handling */
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Entertainer, 'entertainerId'>>({
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: null,
  });

  /* Handle form input changes */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Handle form submission */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      /* Create new entertainer and redirect to list */
      await entertainerApi.create(formData);
      navigate('/entertainers');
    } catch (err) {
      setError('Failed to create entertainer');
      console.error(err);
    }
  };

  /* Main render with add entertainer form */
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        {/* Header with page title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">Add New Entertainer</h1>
        </div>

        {/* Error message display */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Add entertainer form */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="form-container">
              <div className="row g-3">
                {/* Stage Name field */}
                <div className="col-md-6">
                  <label className="form-label">Stage Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="entStageName"
                    value={formData.entStageName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number field */}
                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="entPhoneNumber"
                    value={formData.entPhoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email field */}
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="entEmailAddress"
                    value={formData.entEmailAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Web Page field */}
                <div className="col-md-6">
                  <label className="form-label">Web Page</label>
                  <input
                    type="url"
                    className="form-control"
                    name="entWebPage"
                    value={formData.entWebPage}
                    onChange={handleChange}
                  />
                </div>

                {/* Street Address field */}
                <div className="col-md-6">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="entStreetAddress"
                    value={formData.entStreetAddress}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* City field */}
                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="entCity"
                    value={formData.entCity}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* State field */}
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="entState"
                    value={formData.entState}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Zip Code field */}
                <div className="col-md-4">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="entZipCode"
                    value={formData.entZipCode}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* SSN field */}
                <div className="col-md-4">
                  <label className="form-label">SSN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="entSsn"
                    value={formData.entSsn}
                    onChange={handleChange}
                  />
                </div>

                {/* Form action buttons */}
                <div className="col-12">
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      Add Entertainer
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate('/entertainers')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
