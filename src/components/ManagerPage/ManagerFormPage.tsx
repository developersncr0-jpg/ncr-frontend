import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../FormPage/FormPage.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import axios from 'axios';

const ManagerFormPage: React.FC = () => {
  const { applicationNumber } = useParams<{ applicationNumber: string }>();
  const navigate = useNavigate();

  const { data: applications = [] } = useSelector(
    (state: RootState) => state.application
  );

  const application = applications.find(
    (app) => app.applicationId === applicationNumber
  );

  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    if (!applicationNumber || !selectedStatus) return;

    try {
      setIsSubmitting(true);
     const response = await axios.post(
  'https://ncr-backend-701153034898.europe-west1.run.app/statusupdate',
  {}, // empty body
  {
    headers: {
      applicationId: applicationNumber || '',
      status: selectedStatus,
    },
  }
);


      setMessage(`Status updated to ${selectedStatus.toUpperCase()}`);
      setTimeout(() => navigate('/manager'), 1500);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update status.');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/manager');
  };

  if (!application) {
    return <p>No application found for ID: {applicationNumber}</p>;
  }

  return (
    <div className="form-container">
      <h2 className="form-header">APPLICANT’S INFORMATION</h2>

      <form>
        {/* Input fields */}
        <div className="form-row">
          <label className="form-label">Government ID Number</label>
          <input type="text" className="form-input" value={application.personId || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">Name Of Applicant</label>
          <input type="text" className="form-input" value={application.applicantName || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">Legal Status</label>
          <input type="text" className="form-input" value={application.legalStatus || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">CIPRO/Registration Number</label>
          <input type="text" className="form-input" value={application.ciproRegistrationNumber || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">Date Of Commencement</label>
          <input type="date" className="form-input" value={application.dateOfCommencement || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">Financial Year-End</label>
          <input type="date" className="form-input" value={application.financialYearEnd || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">Income Tax Reg. Number</label>
          <input type="text" className="form-input" value={application.incomeTaxNumber || ''} disabled />
        </div>
        <div className="form-row">
          <label className="form-label">VAT Registration Number</label>
          <input type="text" className="form-input" value={application.vatRegistrationNumber || ''} disabled />
        </div>
        <div className="form-row" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>

          <select
            className="form-input"
            value={status}
            onChange={handleStatusChange}
            disabled={isSubmitting}
            style={{ width: '50%', maxWidth: '300px' }}
          >
            <option value="">Select Status</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
        </div>


        {message && <p style={{ marginTop: '15px' }}>{message}</p>}

        <div className="show-all-container">
          <button type="button" className="filter-btn" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerFormPage;
