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
    setFilteredData(applications);
  }, [applications]);

  const handleSearch = () => {
    const filtered = applications.filter(app =>
      app['Application Number'].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleShowAll = () => {
    setSearchTerm('');
    setFilteredData(applications);
  };
  
    const handleLogout = () => {
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <LoginPage />;
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
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="link">
                  <Link to={`/form/${row['Application Number']}`}>
                    {row['Application Number']}
                  </Link>
                </td>
                <td>{row['Full Name']}</td>
                <td>{row['Date Of Submission']}</td>
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

