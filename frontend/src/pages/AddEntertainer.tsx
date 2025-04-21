import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { entertainerApi, Entertainer } from '../api/entertainerApi';

export default function AddEntertainer() {
  const navigate = useNavigate();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await entertainerApi.create(formData);
      navigate('/entertainers');
    } catch (err) {
      setError('Failed to create entertainer');
      console.error(err);
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 d-flex flex-column">
      <Navbar />
      <div className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4 px-4">
          <h1>Add New Entertainer</h1>
        </div>

        {error && <div className="alert alert-danger mx-4">{error}</div>}

        <div className="card mx-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
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
              </div>

              <div className="row mb-3">
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
                <div className="col-md-6">
                  <label className="form-label">Web Page</label>
                  <input
                    type="string"
                    className="form-control"
                    name="entWebPage"
                    value={formData.entWebPage}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
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
              </div>

              <div className="row mb-3">
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
              </div>

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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
