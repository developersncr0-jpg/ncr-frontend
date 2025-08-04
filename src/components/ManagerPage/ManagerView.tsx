import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplications } from '../../redux/applicationSlice';
import type { RootState, AppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';
import './ManagerView.css';
import LoginPage from '../LoginPage/LoginPage';

const ManagerView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data: applications, loading, error } = useSelector(
    (state: RootState) => state.application
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  useEffect(() => {
    const sortedByUpdated = [...applications].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setFilteredData(sortedByUpdated);
  }, [applications]);

  const handleSearch = () => {
    const filtered = applications.filter(app =>
      app['applicationId'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    setFilteredData(sorted);
  };

  const handleShowAll = () => {
    setSearchTerm('');
    const sorted = [...applications].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setFilteredData(sorted);
  };

  const handleLogout = () => {
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <LoginPage />;
  }

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner" />
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="manager-container">
      <h1 className="title">Cases</h1>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search with an application number"
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        />
        <button className="filter-btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Application Number</th>
              <th>Full Name</th>
              <th>Date Of Submission</th>
              <th>Vetting Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="link">
                  <Link to={`/form/${row['applicationId']}`}>
                    {row['applicationId']}
                  </Link>
                </td>
                <td>{row['applicantName']}</td>
                <td>
                  {new Date(row['updatedAt']).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </td>
                <td>Successful</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="show-all-container">
        <button className="show-all-btn" onClick={handleShowAll}>Show All</button>
      </div>

      <div className="show-all-container">
        <button className="filter-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ManagerView;
