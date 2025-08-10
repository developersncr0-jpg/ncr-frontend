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

  const handleStatusChange = async (
    e: { target: { value: string } }
  ) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    if (!applicationNumber || !selectedStatus) return;

    try {
      setIsSubmitting(true);
      await axios.post(
        'https://ncr-backend-701153034898.europe-west1.run.app/statusupdate',
        {},
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
        {[
          { label: 'Government ID Number', value: application.personId },
          { label: 'Name Of Applicant', value: application.applicantName },
          { label: 'Legal Status', value: application.legalStatus },
          { label: 'CIPRO/Registration Number', value: application.ciproRegistrationNumber },
          { label: 'Date Of Commencement', value: application.dateOfCommencement, type: 'date' },
          { label: 'Financial Year-End', value: application.financialYearEnd, type: 'date' },
          { label: 'Income Tax Reg. Number', value: application.incomeTaxNumber },
          { label: 'VAT Registration Number', value: application.vatRegistrationNumber },
          { label: 'Status', value: application.message }
        ].map((field, idx) => (
          <div className="form-row" key={idx}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type || 'text'}
              className="form-input"
              value={field.value || ''}
              disabled
            />
          </div>
        ))}

        {/* Approve / Reject buttons */}
        <div className="status-buttons center-align">
          <button
            type="button"
            className={`status-btn approve-btn ${status === 'Approved' ? 'selected' : ''}`}
            onClick={() => setStatus('Approved')}
            disabled={application.status === 'Approved' || application.status === 'Rejected' || isSubmitting}
          >
            Approve
          </button>
          <button
            type="button"
            className={`status-btn reject-btn ${status === 'Rejected' ? 'selected' : ''}`}
            onClick={() => setStatus('Rejected')}
            disabled={application.status === 'Approved' || application.status === 'Rejected' || isSubmitting}
          >
            Reject
          </button>
        </div>

        {/* Submit button */}
        <div className="status-buttons center-align">
          <button
            type="button"
            className="status-btn submit-btn"
            onClick={(e) => handleStatusChange({ target: { value: status } })}
            disabled={
              !status ||
              application.status === 'Approved' ||
              application.status === 'Rejected' ||
              isSubmitting
            }
          >
            Submit
          </button>
        </div>

        {message && <p className="status-message">{message}</p>}

        
      </form>
    </div>
  );
};

export default ManagerFormPage;