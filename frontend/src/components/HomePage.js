import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import logo from './Tiktok_background.png';  // Import the logo image

export default function HomePage() {
    const [videoURL, setVideoURL] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [subtitles, setSubtitles] = useState([]);
    const [played, setPlayed] = useState(0);
    const [playedInput, setPlayedInput] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [isEnterEnabled, setIsEnterEnabled] = useState(false);

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
        }
    };

    const handleAudioUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioURL(url);
        }
    };

    const handleProgress = ({ playedSeconds }) => {
        setSubtitles([...subtitles, `Subtitle at ${playedSeconds} seconds`]);
        setPlayed(playedSeconds);
    };

    const handleEnter = () => {
        const subtitleData = playedInput.reduce((acc, time, index) => {
            if (inputs[index].trim() !== '') {
                acc[time] = inputs[index];
            }
            return acc;
        }, {});

        console.log("Subtitle Data:", JSON.stringify(subtitleData, null, 2));
        // Optionally send or process the subtitleData JSON here
        // For example: send to server, save to file, etc.
    };

    return (
        <div className="container mt-5">
            <header className="header mb-4">
                <img src={logo} alt="Logo" className="logo"/>
            </header>
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
                    {videoURL && (
                        <div className="react-player-wrapper">
                            <ReactPlayer
                                url={videoURL}
                                controls
                                onProgress={handleProgress}
                                className="react-player"
                            />
                        </div>
                    )}
                    <div className="audio-upload mt-3">
                        <label htmlFor="audioUpload" className="form-label">Input your Audio</label>
                        <input 
                            type="file" 
                            accept="audio/*" 
                            onChange={handleAudioUpload} 
                            className="form-control" 
                            id="audioUpload"
                        />
                        {audioURL && (
                            <audio controls src={audioURL} className="mt-2" />
                        )}
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
            </div>
        </div>
    );
}
