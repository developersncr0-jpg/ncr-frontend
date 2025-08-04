import React, { useState } from 'react';
import './LoginPage.css';
import VerificationPage from '../VerificationPage/VerificationPage';
import ManagerView from '../ManagerPage/ManagerView';



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const allowedUsers: Record<string, string> = {
    'Akshata.Shinde@gmail.com': 'ncrdev123',
    'Ram@gmail.com': 'ncrdev123',
  };

  const validateLogin = (email: string, password: string): boolean => {
    return allowedUsers[email] === password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin(email, password)) {
      setError('');
      setLoggedInUser(email);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  // If user is logged in, show their respective component
  if (loggedInUser === 'Akshata.Shinde@gmail.com') {
    return <VerificationPage />;
  } else if (loggedInUser === 'Ram@gmail.com') {
    return <ManagerView />;
  }

  return (
    <div className="login-container">
      

      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />

        <button type="submit" className="login-button">Log In</button>

        {error && <p className="error-message">{error}</p>}

        <p className="forgot-password">Forgot password?</p>
        <p className="signup">
          Don’t have an account? <span className="signup-link">Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
