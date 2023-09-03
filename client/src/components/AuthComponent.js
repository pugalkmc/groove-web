import React, { useState, useEffect } from 'react';
import axios from 'axios';
const domain = "https://groove-server-weld.vercel.app"
function AuthComponent() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const response = await axios.get(`${domain}/check-auth`); // This should match your backend route
        if (response.data.authenticated) {
          setAuthenticated(true);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error(error);
        console.log("Error")
      }
    }

    checkAuthentication();
  }, []);

  // Handle Telegram login button click
  async function handleLoginClick() {
    try {
      const response = await axios.get(`${domain}/auth/telegram`); // This should match your backend route
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  // Handle logout
  async function handleLogout() {
    try {
      await axios.get(`${domain}/logout`); // This should match your backend route
      setAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  // Render content based on authentication status
  return (
    <div className="container">
      <h1 className="mt-4">Authentication with Telegram</h1>
      <hr />

      {authenticated ? (
        <div>
          <p>Welcome, {user.first_name}!</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Please log in with Telegram.</p>
          <button className="btn btn-primary" onClick={handleLoginClick}>
            Login with Telegram
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthComponent;
