import { useEffect, useState } from 'react';
import { Entertainer } from '../types/entertainers';

export default function EntertainersPage() {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);

  useEffect(() => {
    // Fetch entertainers from your API
    fetch('/api/entertainers')
      .then(res => res.json())
      .then(data => setEntertainers(data))
      .catch(err => console.error('Error fetching entertainers:', err));
  }, []);

  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: '900px' }}>
        <h2 className="text-center mb-4 fw-bold">Entertainers</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Stage Name</th>
                <th>Times Booked</th>
                <th>Last Booked Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {entertainers.map(ent => (
                <tr key={ent.entertainerid}>
                  <td>{ent.entStageName}</td>
                  <td>{ent.timesBooked}</td>
                  <td>{new Date(ent.lastBookedDate).toLocaleDateString()}</td>
                  <td><button>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-success">Add Entertainer</button>
        </div>
      </div>
    </div>
  );
}