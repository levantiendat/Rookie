import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import logo from './Tiktok_background.png';  // Import the logo image

export default function HomePage() {
    const [videoURL, setVideoURL] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [audioFiles, setAudioFiles] = useState([]);
    const [subtitles, setSubtitles] = useState([]);
    const [played, setPlayed] = useState(0);
    const [playedInput, setPlayedInput] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [isEnterEnabled, setIsEnterEnabled] = useState(false);
    const [apiResponse, setApiResponse] = useState(null); // State to store API response
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control success modal visibility
    const [isResultEnable, setResultEnable] = useState(false)

    useEffect(() => {
        // Enable the "Enter" button only if all input fields are filled
        setIsEnterEnabled(inputs.every(input => input.trim() !== ''));
    }, [inputs]);

    const handleAddInput = () => {
        setInputs([...inputs, '']);
        setPlayedInput([...playedInput, played]);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoURL(url);
            setVideoFile(file); // Store the file for upload
        }
    };

    const handleAudioUpload = (event) => {
        const files = Array.from(event.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        setAudioFiles(urls); // Store the files for upload
    };

    const handleProgress = ({ playedSeconds }) => {
        setSubtitles([...subtitles, `Subtitle at ${playedSeconds} seconds`]);
        setPlayed(playedSeconds);
    };

    const handleEnter = async () => {
        const scriptArray = playedInput.map((time, index) => ({
            time: time.toFixed(2),
            script: inputs[index]
        }));

        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('scriptArray', JSON.stringify(scriptArray));

        console.log("Form Data to be sent:");
        console.log("Video File:", videoFile);
        console.log("Script Array:", scriptArray);

        try {
            // Simulate waiting for 30 seconds (for demonstration)
            await new Promise(resolve => setTimeout(resolve, 10000));

            // Show success modal after 30 seconds
            
            
            // Send POST request to the API
            const response = await fetch('http://localhost:4000/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Response from server:", data);
                setApiResponse(data); // Store the API response data
                // setShowModal(true); // Show the modal with API response
                setShowSuccessModal(true);
                setResultEnable(true);
                console.log(isResultEnable);
                console.log(showSuccessModal);
            } else {
                console.error("Failed to upload:", response.statusText);
            }
        } catch (error) {
            console.error("Error during upload:", error);
        }
        
    };

    const handleFetchVideo = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/video');
            if (response.ok) {
                const blob = await response.blob();
                const videoUrl = URL.createObjectURL(blob);
                setVideoURL(videoUrl); // Store the URL for ReactPlayer
                setShowModal(true); // Show modal to display the video
            } else {
                console.error('Failed to fetch video:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setVideoURL(null); // Clear video URL when closing modal
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="container mt-1">
            <div className="content">
                <div className="video-section">
                    <div className="mb-3">
                        <label htmlFor="videoUpload" className="form-label">Input your Video</label>
                        <input 
                            type="file" 
                            accept="video/*" 
                            onChange={handleVideoUpload} 
                            className="form-control" 
                            id="videoUpload"
                        />
                    </div>
                    {videoURL ? (
                        <div className="react-player-wrapper">
                            <ReactPlayer
                                url={videoURL}
                                controls
                                onProgress={handleProgress}
                                className="react-player"
                            />
                        </div>
                    ) : (
                        <div className="react-player-placeholder">
                            <div className="gray-box"></div>
                        </div>
                    )}
                    <div className="audio-upload mt-3">
                        <label htmlFor="audioUpload" className="form-label">Input your Audio</label>
                        <input 
                            type="file" 
                            accept="audio/*" 
                            multiple 
                            onChange={handleAudioUpload} 
                            className="form-control" 
                            id="audioUpload"
                        />
                        {audioFiles.length > 0 && audioFiles.map((url, index) => (
                            <audio key={index} controls src={url} className="mt-2" />
                        ))}
                    </div>
                </div>
                <div className="inputs-section mt-3">
                    <div className="inputs-container">
                        {inputs.map((input, index) => (
                            <div key={index} className="subtitle-input">
                                <span>{playedInput[index].toFixed(2)}s</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleAddInput} className="btn btn-primary mt-2">
                        Add New Input
                    </button>
                </div>
                <button 
                    onClick={handleEnter} 
                    className="btn btn-success mt-3" 
                    disabled={!isEnterEnabled}
                >
                    SUBMIT TO GENERATE
                </button>
                
                <button
                    onClick={handleFetchVideo}
                    className="btn btn-secondary mt-3"
                    disabled={!isResultEnable}
                >
                    RESULT
                </button>

            </div>
            
            {/* Modal for displaying API response */}
            {showModal && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h5>Result:</h5>
                        {videoURL && (
                            <div className="react-player-wrapper">
                                <ReactPlayer
                                    url={videoURL}
                                    controls={true}
                                    className="react-player"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal for displaying success message */}
            {showSuccessModal && (
                <div id="successModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseSuccessModal}>&times;</span>
                        <h5>Upload and Merged Success!</h5>
                        <p>Your video and audio have been successfully uploaded and merged.</p>
                    </div>
                </div>
            )}
        </div>
    );
}