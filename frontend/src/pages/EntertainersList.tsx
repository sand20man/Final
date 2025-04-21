/**
 * Component for displaying the list of entertainers and their engagement statistics
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { entertainerApi, Entertainer } from '../api/entertainerApi';
import {
  engagementApi,
  EntertainerEngagementStats,
} from '../api/engagementApi';
import '../styles/main.css';

export default function EntertainersList() {
  /* State management */
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [stats, setStats] = useState<
    Record<number, EntertainerEngagementStats>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Fetch entertainers and their engagement stats when component mounts */
  useEffect(() => {
    const fetchData = async () => {
      try {
        /* Fetch both entertainers and stats in parallel */
        const [entertainersData, statsData] = await Promise.all([
          entertainerApi.getAll(),
          engagementApi.getEntertainerStats(),
        ]);

        setEntertainers(entertainersData);

        /* Convert stats array to a map for easy lookup */
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

  /* Loading state UI */
  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="content">
          <div className="spinner-container">
            <div className="spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Error state UI */
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

  /* Main render with entertainers table */
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        {/* Header with page title and add button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="m-0">Entertainers</h1>
          <Link to="/entertainers/add" className="btn btn-primary">
            Add New Entertainer
          </Link>
        </div>

        {/* Entertainers table */}
        <div className="table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Stage Name</th>
                <th style={{ width: '15%' }}>Phone</th>
                <th style={{ width: '20%' }}>Email</th>
                <th style={{ width: '15%' }}>Engagements</th>
                <th style={{ width: '15%' }}>Most Recent</th>
                <th style={{ width: '15%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through entertainers to create table rows */}
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
                        className="btn btn-primary btn-sm"
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
