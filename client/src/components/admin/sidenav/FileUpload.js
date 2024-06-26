import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../../config';
import FileList from './FileList';

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef(null); // Ref to access the file input element

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const response = await axiosInstance.get("/api/project/source/file");
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching files:", error);
            setFiles([]);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            setMessage('Please select a file before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstance.post('/api/project/source/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                fetchFiles(); // Refresh file list after successful upload
                setFile(null);
                setMessage('File uploaded successfully!');
                resetFileInput(); // Reset file input after successful upload
            } else {
                setMessage('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file.');
        } finally {
            // Clear message after 5 seconds
            setTimeout(() => {
                setMessage('');
            }, 5000);
        }
    };

    const refreshList = ()=>{
        fetchFiles()
    }

    const resetFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Resetting the value of file input
        }
    };

    return (
        <div className="mt-3 mb-3">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">Upload PDF File</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                ref={fileInputRef} // Assigning the ref to the file input
                                style={{ height: 50 }}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-submit">
                                Upload
                            </button>
                        </div>
                    </form>
                    {message && (
                        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}
                </div>
                <FileList files={files} refreshList={refreshList} />
            </div>
        </div>
    );
};

export default FileUpload;
