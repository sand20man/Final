import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { entertainerApi, Entertainer } from '../api/entertainerApi';
import '../styles/main.css';

export default function EntertainerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEntertainer = async () => {
      if (!id) return;
      try {
        const data = await entertainerApi.getById(parseInt(id));
        setEntertainer(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch entertainer details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainer();
  }, [id]);

  const handleDelete = async () => {
    if (
      !id ||
      !window.confirm('Are you sure you want to delete this entertainer?')
    )
      return;

    try {
      await entertainerApi.delete(parseInt(id));
      navigate('/entertainers');
    } catch (err) {
      setError('Failed to delete entertainer');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entertainer || !id) return;

    try {
      await entertainerApi.update(parseInt(id), entertainer);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update entertainer');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="spinner-container">
          <div className="spinner text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="content d-flex align-items-center justify-content-center">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      </div>
    );
  }

  if (!entertainer) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="content d-flex align-items-center justify-content-center">
          <div className="alert alert-danger text-center">
            Entertainer not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">{entertainer.entStageName}</h1>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/entertainers')}
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="form-container">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Stage Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={entertainer.entStageName}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entStageName: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={entertainer.entPhoneNumber}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entPhoneNumber: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={entertainer.entEmailAddress}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entEmailAddress: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Web Page</label>
                  <input
                    type="string"
                    className="form-control"
                    value={entertainer.entWebPage}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entWebPage: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={entertainer.entStreetAddress}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entStreetAddress: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={entertainer.entCity}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entCity: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    value={entertainer.entState}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entState: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={entertainer.entZipCode}
                    onChange={(e) =>
                      setEntertainer({
                        ...entertainer,
                        entZipCode: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">SSN</label>
                  <input
                    type="text"
                    className="form-control"
                    value={entertainer.entSsn}
                    onChange={(e) =>
                      setEntertainer({ ...entertainer, entSsn: e.target.value })
                    }
                    readOnly={!isEditing}
                  />
                </div>

                {isEditing && (
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
