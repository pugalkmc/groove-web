import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ConsolePage.css';
import axiosInstance from '../../../config';

function AccountDashboard() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    paymentDetails: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch user data from the server
    const fetchData = async ()=> {
      axiosInstance.get('/api/profile')
      .then(response => {
        console.log(response.data)
        setUser(response.data);
        setFormData({ name: response.data.name, email: response.data.email });
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
    }

    fetchData();
  }, []);

  const handleChangePassword = () => {
    alert("Change Password option will be available soon.");
  };

  const handleAddPaymentDetails = () => {
    alert("Add Payment Details option will be available soon.");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Post the updated data to the server
    await axiosInstance.post('/api/profile', formData)
      .then(response => {
        setUser(formData);
        setIsEditing(false);
      })
      .catch(error => {
        console.error("There was an error updating the user data!", error);
      });
  };

  return (
    <div className='console-page'>
      <div className="container pt-5">
        <h2>Account Dashboard</h2>
        <div className='d-flex justify-content-end'>
          {!isEditing ? (
            <div className='pointer btn btn-submit' onClick={handleEditToggle}>
            <span className="fa fa-edit">
            </span>
            <span className='ml-2'>Edit</span>
            </div>
          ) : (
            <span onClick={handleEditToggle} className="text-xl pointer btn btn-submit">
              Cancel
          </span>
          )}

        </div>
        {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Name</h5>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Email</h5>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-submit mt-3">Save</button>
          </form>
        ) : (
          <>
            <div className="card mt-3">
              <div className="card-body d-inline-block">
                <h5 className="card-title">Name</h5>
                <p className="card-text">{user.name}</p>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body d-inline-block">
                <h5 className="card-title">Email</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          </>
        )}
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Change Password</h5>
            <button onClick={handleChangePassword} className="btn btn-submit">Change Password</button>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Payment Details</h5>
            {user.paymentDetails ? (
              <div>
                <p className="card-text">Card Number: **** **** **** 1234</p>
                <p className="card-text">Expiry Date: 12/24</p>
              </div>
            ) : (
              <div>
                <p className="card-text">No payment details added.</p>
                <button onClick={handleAddPaymentDetails} className="btn btn-submit">Add Payment Details</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
