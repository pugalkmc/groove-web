import React, { useState } from "react";
import axios from "axios";
import "./ExpertHelp.css";

const ExpertHelp = () => {
  const [helpCategory, setHelpCategory] = useState("");
  const [details, setDetails] = useState("");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleTriggerExpert = async () => {
    try {
      const res = await axios.post("/api/trigger-expert", {
        helpCategory,
        details,
      });
      setResponse(res.data);
      setStatus("pending");
    } catch (err) {
      setError("Failed to trigger expert.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTriggerExpert();
  };

  return (
    <div className="container mt-5">
      <h4 className="text-center mb-4">Talk to Expert</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="helpCategory">Help Category</label>
          <select
            className="form-control custom-select h-25"
            id="helpCategory"
            value={helpCategory}
            onChange={(e) => setHelpCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="category1">Bot Feeding</option>
            <option value="category2">Accuracy Regarding</option>
            <option value="category3">Bot Controls</option>
            <option value="category4">Others</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label htmlFor="details">Brief Details</label>
          <textarea
            className="form-control"
            id="details"
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-submit w-100 mt-3 btn-block">
          Submit
        </button>
      </form>

      <div className="text-center mt-4 mb-4">
        <hr />
        <span className="or-divider">OR</span>
      </div>

      <div className="text-center">
        <a
          className="btn btn-submit mr-2"
          href="mailto:pugalkmc@gmail.com"
        >
          Email Contact
        </a>
        <a
          className="btn btn-submit"
          href="https://telegram.me/pugalkmc"
        >
          Telegram Contact
        </a>
      </div>

      {response && (
        <div className="alert alert-success mt-4">
          Expert triggered at {response.triggeredTime}. Status: {status}.
        </div>
      )}
      {error && <div className="alert alert-danger mt-4">{error}</div>}
    </div>
  );
};

export default ExpertHelp;
