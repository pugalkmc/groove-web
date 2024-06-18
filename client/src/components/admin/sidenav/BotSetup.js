import React, { useState, useEffect } from 'react';
import './BotSetup.css'; // Custom CSS for specific styles
import axiosInstance from '../../../config';
import instruction_1_img from "../../../images/instruction_1.jpeg";
import instruction_2_img from "../../../images/instruction_2.jpeg";
import { Link } from 'react-router-dom';

const BotSetup = () => {
    const [botDetails, setBotDetails] = useState(null); // State to hold bot details
    const [showInstructions, setShowInstructions] = useState(false); // State to manage instructions visibility
    const [copySuccess, setCopySuccess] = useState(''); // State to show copy success message

    useEffect(() => {
        const fetchBotDetails = async () => {
            try {
                const response = await axiosInstance.get('/api/project/setup'); // Adjust endpoint as per your API
                setBotDetails(response.data); // Assuming response.data contains bot setup details
            } catch (error) {
                console.error('Error fetching bot details:', error);
                // Handle error as needed
            }
        };

        fetchBotDetails();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`/register ${botDetails.registerId}`)
            .then(() => {
                setCopySuccess('Copied!');
                setTimeout(() => setCopySuccess(''), 2000); // Clear the success message after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Bot Setup</h2>
            {botDetails ? (
                <div className="card bg-light p-4">
                    <div className="card-body">
                        <div className="step mb-4">
                            <h2 className="border-bottom pb-2">Step 1</h2>
                            <p>Add <code>@GrooveAssistantBot</code> to your Telegram group!</p>
                            <div className="d-flex gap-3">
                                <a href="https://t.me/GrooveAssistantBot?startgroup=true" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    Add to Telegram
                                </a>
                            </div>

                        </div>
                        <div className="step mb-4">
                            <h2 className="border-bottom pb-2">Step 2</h2>
                            <p>Set up Telegram group and permissions</p>
                            <button className="btn btn-outline-dark" onClick={toggleInstructions}>
                                {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
                            </button>
                            {showInstructions && (
                                <div className="mt-3">
                                    <p>Provide required permissions as shown below</p>
                                    <p>Input the command into your group to set up the bot</p>
                                    <div className='row'>
                                        <img src={instruction_1_img} alt="Instruction" className="col-6 instruction-img" />
                                        <img src={instruction_2_img} alt="Instruction" className="col-6 instruction-img" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="step mb-4">
                            <h2 className="border-bottom pb-2">Step 3</h2>
                            <p>Copy the register commands and enter them in your Telegram and Discord group.</p>
                            <div className="command bg-light p-3 rounded mb-3">
                                {botDetails.groupId ? (
                                    <p>Currently linked to Telegram Group ID: <code>{botDetails.groupId}</code></p>
                                ) : (
                                    <p>No group linked currently.</p>
                                )}
                                <div className="register-command d-flex align-items-center">
                                    <code className="text-success">{botDetails.groupId ? '/unregister' : '/register'} {botDetails.registerId}</code>
                                    <button className="btn btn-success ms-auto" onClick={handleCopy}>Copy</button>
                                </div>
                                {copySuccess && <span className="text-success ms-2">{copySuccess}</span>}
                            </div>
                        </div>
                        <div className="extra-links d-flex justify-content-between">
                            <Link to="/console/expert" className="text-success">Need own bot and customization?</Link>
                            <Link to="/console/expert" className="text-success">Contact Help</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-5">Loading bot details...</p>
            )}
        </div>
    );
};

export default BotSetup;
