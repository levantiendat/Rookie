import React, { useState, useEffect } from 'react';
import './HashtagRecommendation.css';


const initialAiRecommendations = [];

const HashtagSelector = () => {
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedSets, setSelectedSets] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState(initialAiRecommendations);
  const [hashtagSets, setHashtagSets] = useState([]);

  useEffect(() => {
    // Fetch hashtag sets from the API on component mount
    fetchHashtagSets();
  }, []);

  const fetchHashtagSets = () => {
    const ids = ['a001', 'a002', 'a003'];
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    
    fetch('http://localhost:5000/rookie_api/hashtag/recommend-hashtag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'id': randomId  // Sử dụng ID ngẫu nhiên
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from Frequent Itemsets API:', JSON.parse(data)); // Log dữ liệu nhận được để debug
        // if (data && Array.isArray((data['frequent_hashtags']))) {
        //   setHashtagSets(JSON.parse(data['frequent_hashtags'])); // Lưu dữ liệu vào hashtagSets
        // } else {
        //   throw new Error('Invalid response format');
        // }
        let hashList = JSON.parse(data)
        setHashtagSets(hashList["frequent_hashtags"])
        console.log(typeof(JSON.parse(data)))
      })
      .catch(error => {
        console.error('Error fetching hashtag sets:', error);
      });
  };

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
        console.log('Response from AI:', data); // Log dữ liệu nhận được để debug
        // if (data && Array.isArray(data.hashtag)) {
        //   setAiRecommendations(data.hashtag); // Cập nhật aiRecommendations
        // } else {
        //   throw new Error('Invalid response format');
        // }
        let responseHashtag;
        responseHashtag = JSON.parse(data)
        setAiRecommendations(responseHashtag['hashtag'])
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
          {hashtagSets.length > 0 ? (
            hashtagSets.map((set, index) => (
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
            ))
          ) : (
            <p>No hashtag sets available</p>
          )}
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