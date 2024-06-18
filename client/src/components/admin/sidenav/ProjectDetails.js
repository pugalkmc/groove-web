import { useState, useEffect } from "react";
import axiosInstance from "../../../config";
import './styles.css';

function ProjectDetails() {
  const [project, setProject] = useState({
    name: "",
    email: "",
  });

  const [formData, setFormData] = useState(project);
  const [dataChanged, setDataChanged] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);
  const [formStatus, setFormStatus] = useState(false);

  const dataChangeHandler = (event) => {
    setDataChanged(true);
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get("/api/project/details")
        .then(res => {
          setProject(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSavingStatus(true);
    await axiosInstance.post("/api/project/details", formData)
      .then(res => {
        setProject(formData);
        setFormStatus(false);
      })
      .catch(err => {
        console.log(err);
      });

    setSavingStatus(false);
    setDataChanged(false);
  };

  return (
    <section className="container pt-4">
      <h3 className='text-center' style={{ fontSize: 26 }}>Project Details</h3>
      {
        formStatus ? (
          <form className="project-details-form pt-1" onSubmit={handleSubmit}>
            <div className="pt-3">
              <label htmlFor="name" className="d-block form-label">Project Name</label>
              <input type="text" min={1} id="name" className="form-control" value={formData.name} onChange={dataChangeHandler} required></input>
            </div>
            <div className="pt-4">
              <label htmlFor="email" className="d-block form-label">Official Email</label>
              <input type="email" min={1} id="email" className="form-control" value={formData.email} onChange={dataChangeHandler} required></input>
              <p>This email will be used by our admin to contact, if any details needed</p>
            </div>
            <button className="btn btn-submit mt-3" disabled={!dataChanged} type="submit">{savingStatus ? 'Saving..' : 'Save'}</button>
            <button className="btn btn-danger mt-3 ml-3" type="button" onClick={() => { setFormData({}); setFormStatus(false); }}>Cancel</button>
          </form>
        ) : (
          <div className="project-details-container pt-4">
            <div className="pb-4">
              <label htmlFor="projectName" className="form-label">Project Name</label>
              <p className="form-control">{project.name}</p>
            </div>
            <div className="pb-4">
              <label htmlFor="projectEmail" className="form-label">Official Email</label>
              <p className="form-control">{project.email}</p>
            </div>
            <button className="btn btn-submit" onClick={() => { setFormStatus(true); setFormData(project); setDataChanged(false); setSavingStatus(false); }}>Edit details</button>
          </div>
        )
      }
    </section>
  );
}

export default ProjectDetails;
