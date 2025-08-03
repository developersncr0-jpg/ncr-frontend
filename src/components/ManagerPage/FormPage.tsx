// src/components/FormPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApplications } from '../../mockData';
import ManagerView from './ManagerView';

const FormPage: React.FC = () => {
  const { applicationNumber } = useParams<{ applicationNumber: string }>();
  const navigate = useNavigate();

  const application = mockApplications.find(
    (app) => app.applicationNumber === applicationNumber
  );

  const [status, setStatus] = useState<'approved' | 'rejected' | ''>('');

  if (!application) {
    return <div>No application found with number: {applicationNumber}</div>;
  }

  const handleApprove = () => {
    setStatus('approved');
    // TODO: Send status to backend or store
    //setTimeout(() => navigate('/'), 1000); // simulate navigation after action
  };

  const handleReject = () => {
    setStatus('rejected');
    // TODO: Send status to backend or store
    setTimeout(() => navigate('/'), 1000); // simulate navigation after action
  };
 

  const handleBack = () => {
    navigate('/manager'); // Adjust this path as per your router
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Application Details</h2>

      <div className="form-field">
        <label>Application Number</label>
        <input value={application.applicationNumber} disabled />
      </div>

      <div className="form-field">
        <label>Full Name</label>
        <input value={application.fullName} disabled />
      </div>

      <div className="form-field">
        <label>Date of Submission</label>
        <input value={application.dateOfSubmission} disabled />
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={handleApprove} style={{ background: 'green', color: '#fff', padding: '10px 20px' }}>
          Approve
        </button>
        <button onClick={handleReject} style={{ background: 'red', color: '#fff', padding: '10px 20px' }}>
          Reject
        </button>
      </div>

      <button onClick={handleBack} style={{ background: 'red', color: '#fff', padding: '10px 20px' }}>
          Back button
        </button>

      {status && <p style={{ marginTop: '15px' }}>Application {status.toUpperCase()}.</p>}
    </div>
  );
};

export default FormPage;
