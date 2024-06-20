import React, { useState } from 'react';
import axiosInstance from '../../config';
import PopInfo from '../super/PopInfo';


const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    details: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(!showModal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/feedback', formData);
      if (response.status === 200) {
        setFormData({
          name: '',
          email: '',
          category: '',
          details: ''
        });
        handleCloseModal()
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback');
    }
  };


  return (
    <div className="m-auto" style={{ height: 600, minWidth: 400, maxWidth: 600 }}>
      <div className="card shadow-lg p-4 mt-5 ml-4 mr-4">
        <div className="card-header bg-secondary text-white text-center">
          <h2>Feedback Form</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category" className="form-label">Category of Feedback</label>
              <select
                className="form-select"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="details" className="form-label">Brief Details</label>
              <textarea
                className="form-control"
                id="details"
                name="details"
                rows="3"
                value={formData.details}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
          </form>
          {/* Modal */}
          <PopInfo title={"Thankyou"} description={"Thank you for your valuable feedback"} showModal={showModal} handleCloseModal={handleCloseModal}/>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
