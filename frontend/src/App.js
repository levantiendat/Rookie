import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Intro from './components/Intro';
import HomePage from './components/HomePage';
import MusicRecommendation from './components/MusicRecommendation';
import HashtagRecommendation from './components/HashtagRecommendation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="bg-light p-3 d-flex justify-content-center align-items-center">
          <div>
            <Link className="nav-link d-inline-flex align-items-center m-2" to="/">
              <i className="fa-solid fa-house fa-2xl m-3"></i>
              <h3 className="m-0">Home</h3>
            </Link>
            
            <Link className="nav-link d-inline-flex align-items-center m-2" to="/upload-video">
              <i className="fa-solid fa-audio-description fa-2xl m-3"></i>
              <h3 className="m-0">Audio Generation</h3>
            </Link>
            
            <Link className="nav-link d-inline-flex align-items-center m-2" to="/select-music">
              <i className="fa-solid fa-music fa-2xl m-3"></i>
              <h3 className="m-0">Music</h3>
            </Link>

            <Link className='nav-link d-inline-flex align-items-center m-2' to="/hashtag-generate">
              <i className="fa-solid fa-hashtag fa-2xl m-3"></i>
              <h3 className="m-0">Hashtag Recommendation</h3>
            </Link>
          </div>

          <div className="flex-grow-1"></div> 
        </header>

        <div className="main-content">
          <Routes>
            <Route exact path='/' element={<Intro />} />
            <Route path="/upload-video" element={<HomePage />} />
            <Route path="/select-music" element={<MusicRecommendation />} />
            <Route path='/hashtag-generate' element={<HashtagRecommendation />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
