import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';
import LoginPage from '../LoginPage/LoginPage';
import NavigationBar from '../FormPage/NavigationBar';
import '../ManagerPage/ManagerView.css'


const FormPage: React.FC = () => {
  const [personId, setPersonId] = useState('12462');
  const [applicantName, setApplicantName] = useState('Akshata Shinde');
  const [legalStatus, setLegalStatus] = useState('');
  const [otherLegalStatus, setOtherLegalStatus] = useState('');
  const [ciproRegistrationNumber, setCiproRegistrationNumber] = useState('');
  const [dateOfCommencement, setDateOfCommencement] = useState('');
  const [financialYearEnd, setFinancialYearEnd] = useState('');
  const [incomeTaxNumber, setIncomeTaxNumber] = useState('');
  const [vatRegistrationNumber, setVatRegistrationNumber] = useState('');
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);


  const logoutfunction = () => {
    setLoggedOut(true);
  };
  if (loggedOut) {
    return <LoginPage />;
  }

  const handleSubmit = async () => {
    const data = {
      personId,
      applicantName,
      legalStatus: legalStatus === 'other' ? otherLegalStatus : legalStatus,
      ciproRegistrationNumber,
      dateOfCommencement,
      financialYearEnd,
      incomeTaxNumber,
      vatRegistrationNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
        

      
   
  
   

    try {
      const response = await fetch('https://ncr-backend-701153034898.europe-west1.run.app/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Submitted successfully:', result);
        alert('Form submitted successfully!');
        navigate('/tracking');
      } else {
        const errorData = await response.text();
        console.error('Error:', errorData);
        alert('Submission failed.');
      }
    } catch (error) {
    
      alert('Error connecting to server.');
    }

  };

  
  return (
    <div>
      <NavigationBar ></NavigationBar>
    <div className="form-container">
      <h2 className="form-header">APPLICANT’S INFORMATION</h2>

      <form>
        <div className="form-row">
          <label className="form-label">Government ID Number</label>
          <input
            type="text"
            className="form-input"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Name of applicant</label>
          <input
            type="text"
            className="form-input"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Legal status</label>
          <select
            className="form-select"
            value={legalStatus}
            onChange={(e) => setLegalStatus(e.target.value)}
          >
            <option value="">-- Select Legal Status --</option>
            <option value="2.1 Private Company">2.1 Private Company</option>
            <option value="2.2 Public Company">2.2 Public Company</option>
            <option value="2.3 Partnership">2.3 Partnership</option>
            <option value="2.4 Close Corporation">2.4 Close Corporation</option>
            <option value="2.5 Co-operative">2.5 Co-operative</option>
            <option value="2.6 Trust">2.6 Trust</option>
            <option value="other">2.7 Other (specify)</option>
          </select>
        </div>

        {legalStatus === 'other' && (
          <div className="form-row">
            <label className="form-label">Other Legal Status</label>
            <input
              type="text"
              className="form-input"
              value={otherLegalStatus}
              onChange={(e) => setOtherLegalStatus(e.target.value)}
              placeholder="Specify other legal status"
            />
          </div>
        )}

        <div className="form-row">
          <label className="form-label">CIPRO/registration number</label>
          <input
            type="text"
            className="form-input"
            value={ciproRegistrationNumber}
            onChange={(e) => setCiproRegistrationNumber(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Date of commencement</label>
          <input
            type="date"
            className="form-input"
            value={dateOfCommencement}
            onChange={(e) => setDateOfCommencement(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Financial Year-End</label>
          <input
            type="date"
            className="form-input"
            value={financialYearEnd}
            onChange={(e) => setFinancialYearEnd(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">Income Tax reg. number</label>
          <input
            type="text"
            className="form-input"
            value={incomeTaxNumber}
            onChange={(e) => setIncomeTaxNumber(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label className="form-label">VAT registration number</label>
          <input
            type="text"
            className="form-input"
            value={vatRegistrationNumber}
            onChange={(e) => setVatRegistrationNumber(e.target.value)}
          />
        </div>

      
      <div className="show-all-container">

        <button type="button" className="filter-btn" onClick={handleSubmit}>Submit</button>
      </div>

        
      </form>
    </div>
    </div>
  );
};

export default FormPage;