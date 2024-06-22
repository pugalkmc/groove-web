// FileList.js
import React, { useState } from "react";
import axiosInstance from "../../../config";
import PopInfo from "../../super/PopInfo";

const FileList = ({files, refreshList}) => {
  const [modelData, setModelData] = useState({
    title: '',
    description: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(!showModal);

  const handleDeleteFile = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/project/source/file/${id}`);
      if (response.status === 200) {
        refreshList()
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

  return (
    <div className="p-4 card mt-3">
      <PopInfo title={modelData.title} description={modelData.description} showModal={showModal} handleCloseModal={handleCloseModal} />
      <h3>Uploaded Files</h3>
      <ul className="list-group">
        {files.map(file => (
          <li key={file._id} className="list-group-item d-flex justify-content-between">
            <div style={{ maxWidth: "75%", whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-all" }}>
              <p>{file.tag}</p>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary ml-2"
              type="button"
              onClick={() => handleDeleteFile(file._id)}
              style={{ maxHeight: "35px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {files.length === 0 && <p>No files found or error while fetching.</p>}
    </div>
  );
};

export default FileList;