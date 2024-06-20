import React, { useState, useEffect } from 'react';
import './BotControls.css';
import './styles.css'
import axiosInstance from '../../../config';


const BotControls = () => {
  const [settings, setSettings] = useState({
    status: true,
    rateLimit: false,
    rateLimitThreshold: 0,
    rateLimitTimeout: 0,
    profanityFilter: false,
    welcomeNewUsers: false,
  });

  const [isChanged, setIsChanged] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axiosInstance.get('/api/project/controls');
        setSettings(res.data.controls);
      } catch (err) {
        setError('Failed to fetch current settings.');
        setTimeout(() => setError(''), 3000);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setIsChanged(true);
    const { id, type, checked, value } = e.target;

    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: type === 'checkbox' ? checked : parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/project/controls', settings);
      setSuccess('Settings updated successfully.');
      setIsChanged(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update settings.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='text-center'>Controls</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="card p-lg-5 p-md-3 p-3">
        <div className="form-group form-switch mt-3">
          <label htmlFor="status" className="mr-3 form-label bot-control-label" style={{ fontSize: 20 }}>
            Bot Status
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id='status'
              checked={settings.status}
              onChange={handleChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <hr></hr>
        <h4 className="mt-4">Function Controls</h4>
        <div className="form-group form-switch mt-3">
          <label htmlFor="rateLimit" className='mr-3 form-label bot-control-label'>Rate Limit</label>
          <label className="switch">
            <input
              type="checkbox"
              id='rateLimit'
              checked={settings.rateLimit}
              onChange={handleChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {settings.rateLimit && (
          <>
            <div className="form-group mt-3">
              <label htmlFor="rateLimitThreshold" className="form-label bot-control-label">Rate Limit Threshold</label>
              <input
                type="number"
                className="form-control"
                id="rateLimitThreshold"
                value={settings.rateLimitThreshold}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="rateLimitTimeout" className="form-label bot-control-label">Rate Limit Action (minutes)</label>
              <input
                type="number"
                className="form-control"
                id="rateLimitTimeout"
                value={settings.rateLimitTimeout}
                onChange={handleChange}
                min="0"
              />
            </div>
          </>
        )}
        <div className="form-group form-switch mt-3">
          <label htmlFor="profanityFilter" className='mr-3 form-label bot-control-label'>Profanity Filter</label>
          <label className="switch">
            <input
              type="checkbox"
              id='profanityFilter'
              checked={settings.profanityFilter}
              onChange={handleChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="form-group form-switch mt-3">
          <label htmlFor="welcomeNewUsers" className='mr-3 form-label bot-control-label'>Welcome New Joiners</label>
          <label className="switch">
            <input
              type="checkbox"
              id='welcomeNewUsers'
              checked={settings.welcomeNewUsers}
              onChange={handleChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <button type="submit" className="btn btn-submit mt-3" disabled={!isChanged}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default BotControls;
