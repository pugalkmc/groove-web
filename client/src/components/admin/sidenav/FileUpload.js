import React, { useState } from 'react';
import axiosInstance from '../../../config';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

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
            setTimeout(()=> {
                setMessage('')
            }, 5000)

            if (response.status === 200) {
                setMessage('File uploaded successfully!');
            } else {
                setMessage('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Error uploading file.');

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
                                style={{height: 50}}
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
            </div>
        </div>
    );
};

export default FileUpload;
