import axiosInstance from "../../config";

const validate = async (navigate) => {
  const token = localStorage.getItem('token')

  if (token) {
    try {
      // Make a request to validate the token
      const response = await axiosInstance.post("/api/auth");

      if (response.status !== 200) {
        // If response status is not 200, clear token and navigate to login
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error('Error validating token:', error);
      // Handle error as needed
    }
  } else {
    // If no token found, clear cookies and navigate to login
    localStorage.clear();
    navigate("/login");
  }
};

export {
  validate,
};