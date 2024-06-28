import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './App.css'; // Ensure this is imported

function App() {
  const [videoURL, setVideoURL] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [played, setPlayed] = useState(0);
  const [playedInput, setPlayedInput] = useState([]);

  const [inputs, setInputs] = useState([]); // Initial state with one input

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
    setPlayed(playedSeconds)
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      {videoURL && (
        <ReactPlayer
          url={videoURL}
          controls
          onProgress={handleProgress}
        />
      )}
      <div>
        {inputs.map((input, index) => (
          <div>
            <p>{ playedInput[index]}</p>
            <input
              key={index}
              type="text"
              value={input}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
          
        ))}
        <button onClick={handleAddInput}>Add New Input</button>
      </div>
    </div>
  );
}

export default App;

