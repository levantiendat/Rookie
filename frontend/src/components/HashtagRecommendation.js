import React, { useState } from 'react';
import './HashtagRecommendation.css';

const hashtagSets = [
  ['hashtag1', 'hashtag2', 'hashtag3'],
  ['hashtag1', 'hashtag2', 'hashtag4'],
  ['hashtag5', 'hashtag6'],
  ['hashtag7', 'hashtag8']
];

const initialAiRecommendations = [];

const HashtagSelector = () => {
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState(initialAiRecommendations);

  const handleHashtagClick = (hashtag) => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const handleRemoveHashtag = (hashtag) => {
    setSelectedHashtags(selectedHashtags.filter(tag => tag !== hashtag));
  };

  const handleSetClick = (set, index) => {
    if (!selectedSets.includes(index)) {
      setSelectedSets([...selectedSets, index]);
      const newHashtags = set.filter(hashtag => !selectedHashtags.includes(hashtag));
      setSelectedHashtags([...selectedHashtags, ...newHashtags]);
    } else {
      setSelectedSets(selectedSets.filter(i => i !== index));
      const newSelectedHashtags = selectedHashtags.filter(hashtag => !set.includes(hashtag));
      setSelectedHashtags(newSelectedHashtags);
    }
  };

  const requestAiRecommendations = () => {
    // Đây là ví dụ để giả lập request từ AI
    const newRecommendations = ['hashtag5', 'hashtag9', 'hashtag8', 'hashtag10', 'hashtag11'];
    setAiRecommendations(newRecommendations);
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="title">Hashtag Generation</h1>
      </div>
      <div className="selectedBox">
        {selectedHashtags.length > 0 ? (
          selectedHashtags.map((hashtag, index) => (
            <span key={index} className="hashtag selected">
              #{hashtag} <button onClick={() => handleRemoveHashtag(hashtag)}>x</button>
            </span>
          ))
        ) : (
          <p>No hashtags selected</p>
        )}
      </div>
      <div className="contentBox">
        <div className="hashtagSetsBox">
          {hashtagSets.map((set, index) => (
            <div key={index} className="hashtagSet">
              <button 
                className={`hashtagSetButton ${selectedSets.includes(index) ? 'selected' : ''}`} 
                onClick={() => handleSetClick(set, index)}
              >
                Select Set {index + 1}
              </button>
              <div className="hashtagSetContent">
                {set.map((hashtag, idx) => (
                  <span 
                    key={idx} 
                    className={`hashtag ${selectedHashtags.includes(hashtag) ? 'selected' : ''}`}
                    onClick={() => handleHashtagClick(hashtag)}
                  >
                    #{hashtag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="aiRecommendationsBox">
          <button className="requestAiButton" onClick={requestAiRecommendations}>Request Hashtags from AI</button>
          <div className="recommendationContent">
            {aiRecommendations.map((hashtag, idx) => (
              <span 
                key={idx} 
                className={`hashtag ${selectedHashtags.includes(hashtag) ? 'selected' : ''}`}
                onClick={() => handleHashtagClick(hashtag)}
              >
                #{hashtag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashtagSelector;