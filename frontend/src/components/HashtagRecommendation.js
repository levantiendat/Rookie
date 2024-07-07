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
    fetch('http://localhost:5000/rookie_api/hashtag/ai-requested', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'text': "Welcome to Rookie Can Cook, where beginners can become great chefs! Today, we'll explore how to make a fresh and delicious salad that's simple yet delightful. Don't forget to hit 'Like' and 'Subscribe' so you won't miss any exciting recipes! Okay then - Let's get into the kitchen and start cooking!"
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from AI:', data); // In kết quả nhận được từ API vào console log
        // Chuyển đổi JSON thành đối tượng JavaScript
        const responseObject = JSON.parse(data);

        // Lấy mảng hashtag từ đối tượng responseObject
        const hashtags = responseObject.hashtag;

        console.log('Response from AI.tag:',hashtags); // In ra mảng các hashtag
        if (hashtags) {
          setAiRecommendations(hashtags);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
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
