
import axiosInstance from "../../config";

const validate = async (navigate) => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axiosInstance.post("/api/auth");
        if (response.status !== 200) {
          localStorage.clear();
            navigate("/login");
        }
      }
      catch (err) {
        console.log(err)
      }
      }
    else {
      localStorage.clear();
        navigate("/login");
    }
  };


  export {
    validate
  }