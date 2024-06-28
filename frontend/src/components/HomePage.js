import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

export default function HomePage() {
    const [videoURL, setVideoURL] = useState(null);
    const [subtitles, setSubtitles] = useState([]);
    const [played, setPlayed] = useState(0);
    const [playedInput, setPlayedInput] = useState([]);
    const [inputs, setInputs] = useState([]);
  
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
  
    const handleProgress = ({ playedSeconds }) => {
      setSubtitles([...subtitles, `Subtitle at ${playedSeconds} seconds`]);
      setPlayed(playedSeconds);
    };
  
    return (
      <div className="container mt-5">
        <div className="mb-3">
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleVideoUpload} 
            className="form-control" 
          />
        </div>
        {videoURL && (
          <div className="mb-3">
            <ReactPlayer
              url={videoURL}
              controls
              onProgress={handleProgress}
              className="w-100"
            />
          </div>
        )}
        <div>
          {inputs.map((input, index) => (
            <div key={index} className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2 text-muted">{playedInput[index]}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          ))}
          <button onClick={handleAddInput} className="btn btn-primary">
            Add New Input
          </button>
        </div>
      </div>
    );
}
