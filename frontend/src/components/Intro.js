import React from 'react';
import './Intro.css';
import { Link } from 'react-router-dom';

export default function Intro() {
  return (
    <div className="home-container">
      <div className="top-banner">
        <div className="top-banner-illust"></div>
        <div className="top-banner-content">
          <h1 className="top-banner-heading">ROOKIE GENERATOR</h1>
          <p className="top-banner-body">
            Rookie - Craft Perfect Videos with Audio, Trending Hashtags, and the Right Music!
          </p>
          <Link to="/upload-video" className="start-relay-btn">Get Started</Link>
        </div>
      </div>
    </div>
  );
}
