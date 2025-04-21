import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { entertainerApi, Entertainer } from '../api/entertainerApi';
import {
  engagementApi,
  EntertainerEngagementStats,
} from '../api/engagementApi';

export default function EntertainersList() {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [stats, setStats] = useState<
    Record<number, EntertainerEngagementStats>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entertainersData, statsData] = await Promise.all([
          entertainerApi.getAll(),
          engagementApi.getEntertainerStats(),
        ]);

        setEntertainers(entertainersData);

        // Convert stats array to a map for easy lookup
        const statsMap = statsData.reduce(
          (acc, stat) => {
            acc[stat.entertainerId] = stat;
            return acc;
          },
          {} as Record<number, EntertainerEngagementStats>
        );

        setStats(statsMap);
        setError(null);
      } catch (err) {
        setError('Failed to fetch entertainers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid vh-100 p-0 d-flex flex-column">
        <Navbar />
        <div className="flex-grow-1 p-4 bg-light d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid vh-100 p-0 d-flex flex-column">
        <Navbar />
        <div className="flex-grow-1 p-4 bg-light d-flex align-items-center justify-content-center">
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid vh-100 p-0 d-flex flex-column">
      <Navbar />
      <div className="flex-grow-1 p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Entertainers</h1>
          <Link to="/entertainers/add" className="btn btn-primary">
            Add New Entertainer
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Stage Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Engagements</th>
                <th>Most Recent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entertainers.map((entertainer) => {
                const entertainerStats = stats[entertainer.entertainerId];
                return (
                  <tr key={entertainer.entertainerId}>
                    <td>{entertainer.entStageName}</td>
                    <td>{entertainer.entPhoneNumber}</td>
                    <td>{entertainer.entEmailAddress}</td>
                    <td>{entertainerStats?.engagementCount || 0}</td>
                    <td>
                      {entertainerStats?.mostRecentDate
                        ? new Date(
                            entertainerStats.mostRecentDate
                          ).toLocaleDateString()
                        : 'Never'}
                    </td>
                    <td>
                      <Link
                        to={`/entertainers/${entertainer.entertainerId}`}
                        className="btn btn-sm btn-info me-2"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
