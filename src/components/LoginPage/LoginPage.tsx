import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateLogin = (email: string, password: string): boolean => {
    const allowedUsers: Record<string, string> = {
      'Akshata.Shinde@gmail.com': 'ncrdev123',
      'Ram@gmail.com': 'ncrdev123',
    };
    return allowedUsers[email] === password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLogin(email, password)) {
      alert('Login successful!');
      setError('');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <h1 className="ncr-title">NCR</h1>
        <p className="ncr-subtitle">National Credit Regulator</p>
        <span className="ncr-tagline">Advancing Fair Inclusive Credit</span>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>

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
