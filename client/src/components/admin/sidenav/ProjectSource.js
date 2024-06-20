import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config";
import FileUpload from "./FileUpload";
import PopInfo from "../../super/PopInfo";

const ProjectSource = () => {
  const [sources, setSources] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [newTextTag, setNewTextTag] = useState("");
  const [newText, setNewText] = useState("");
  const [editTextId, setEditTextId] = useState(null);
  const [editTextValue, setEditTextValue] = useState("");
  const [ modelData, setModelData ] = useState({
    title:'',
    description: ''
  })

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(!showModal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/project/source");
        console.log(response.data)
        setSources(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSources([]);
      }
    };

    fetchData();
  }, []);

  const handleAddLink = async (e) => {
    e.preventDefault();
    if (newLink.trim() !== "") {
      try {
        const response = await axiosInstance.post("/api/project/source/link", { tag: newLink, value: newLink });
        setSources([...sources, response.data]);
        setNewLink("");
      } catch (error) {
        console.error("Error adding link:", error);
      }
    }
  };

  const handleAddText = async (e) => {
    e.preventDefault();
    if (newTextTag.trim() !== "" && newText.trim() !== "") {
      try {
        const response = await axiosInstance.post("/api/project/source/text", { tag: newTextTag, value: newText });
        setSources([...sources, response.data]);
        setNewTextTag("");
        setNewText("");
      } catch (error) {
        console.error("Error adding text:", error);
      }
    }
  };

  const handleDeleteSource = async (id, type) => {
    try {
        const response = await axiosInstance.delete(`/api/project/source/${type}/${id}`);

        if (response.status === 200) {
            setSources(sources.filter(source => source._id !== id));
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            setModelData({
              title: 'Error',
              description: error.response.data.error
            })
            handleCloseModal()
        } else {
          setModelData({
            title: 'Error',
            description: 'An unexpected error occurred.'
          })
          handleCloseModal()
        }
    }
};

  const handleEditText = (id, value) => {
    setEditTextId(id);
    setEditTextValue(value);
  };

  const handleSaveText = async (id) => {
    try {
      await axiosInstance.put(`/api/project/source/text/${id}`, { value: editTextValue });
      setSources(sources.map(source => 
        source._id === id ? { ...source, values: [{ text: editTextValue }], updatedAt: new Date() } : source
      ));
      setEditTextId(null);
      setEditTextValue("");
    } catch (error) {
      console.error("Error saving text:", error);
    }
  };

  return (
    <div className="container mt-4">
      <PopInfo title={modelData.title} description={modelData.description} showModal={showModal} handleCloseModal={handleCloseModal}/>
      <h2 className="text-center pb-4">Source</h2>
      <FileUpload/>
      <div className="p-4 card">
        <label htmlFor="links" className="form-label text-xl">
          Add Source Links
        </label>
        <p>Bot will use this sources to learn itself about the project</p>
        <form className="input-group mb-3" onSubmit={handleAddLink}>
          <input
            type="text"
            className="form-control"
            id="links"
            placeholder="Enter link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            required
          />
          <button className="ml-2" type="submit">
            <i className="fas fa-plus p-1" style={{ fontSize: 30, color: "rgb(48, 81, 118)" }}></i>
          </button>
        </form>
        <ul className="list-group">
          {sources.filter(source => source.type === 'link').map(link => (
            <li key={link._id} className="list-group-item d-flex justify-content-between">
              <div style={{ maxWidth: "75%", whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" }}>
                <p>{link.tag}</p>
              </div>
              <button
                className="btn btn-sm btn-outline-secondary ml-2"
                type="button"
                onClick={() => handleDeleteSource(link._id, 'link')}
                style={{ maxHeight: "35px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {sources.filter(source => source.type === 'link').length === 0 && <p>No links found or error while fetching.</p>}
      </div>
      <div className="p-4 card mt-3">
        <form onSubmit={handleAddText}>
          <div className="pb-3">
            <p className="text-xl font-bold">Add Manual sources</p>
            <label htmlFor="textTag" className="form-label">Content Tag</label>
            <input
              type="text"
              className="form-control"
              id="textTag"
              placeholder="Enter text tag"
              value={newTextTag}
              onChange={(e) => setNewTextTag(e.target.value)}
              required
            />
          </div>
          <div className="pb-3">
            <label htmlFor="text" className="form-label">Content</label>
            <textarea
              className="form-control"
              id="text"
              placeholder="Enter text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-submit" type="submit">Add Source</button>
        </form>
        <ul className="list-group pt-3">
          {sources.filter(source => source.type === 'text').map(textData => (
            <li key={textData._id} className="list-group-item">
              <strong>{textData.tag}:</strong>
              {editTextId === textData._id ? (
                <>
                  <textarea
                    className="form-control pt-2"
                    value={editTextValue}
                    onChange={(e) => setEditTextValue(e.target.value)}
                    required
                  />
                  <button
                    className="btn btn-outline-secondary mt-2"
                    type="button"
                    onClick={() => handleSaveText(textData._id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{textData.values}</p>
                  <button
                    className="btn btn-outline-secondary mr-2"
                    type="button"
                    onClick={() => handleEditText(textData._id, textData.values)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleDeleteSource(textData._id, 'text')}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        {sources.filter(source => source.type === 'text').length === 0 && <p>No texts found or error while fetching.</p>}
      </div>
    </div>
  );
};

export default ProjectSource;
