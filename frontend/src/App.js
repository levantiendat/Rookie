import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Intro from './components/Intro'
import HomePage from './components/HomePage';
import MusicRecommendation from './components/MusicRecommendation'
import HashtagRecommendation from './components/HashtagRecommendation'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  return (
    <Router>
      <nav class="navbar navbar-light bg-light border border-success">
        <h3 class="navbar-brand p-2 h1">Rookie - Audio Generate & Synchronize Template</h3>
      </nav>
      <div>
        <div className="d-flex border">
          <div className="flex-grow-1">

            <Routes>
              <Route exact path='/' element={<Intro />}></Route>
              <Route path="/upload-video" element={<HomePage />} />
              <Route path="/select-music" element={<MusicRecommendation />} />
              <Route path='/hashtag-generate' element={<HashtagRecommendation/>}></Route>
            </Routes>
          </div>
          <nav className="vertical-bar nav flex-column bg-light p-3 border border-danger" style={{ minHeight: '100vh', width: '200px' }}>
            <Link className="nav-link m-2" to="/">
              <i class="fa-solid fa-house fa-2xl m-3"></i>
              <h3>Intro</h3>
            </Link>
            
            <Link className="nav-link m-2" to="/upload-video">
              <i class="fa-solid fa-audio-description fa-2xl m-3"></i>
              <h3>Video</h3>
            </Link>
            
            <Link className="nav-link m-2" to="/select-music">
              <i class="fa-solid fa-music fa-2xl m-3"></i>
              <h3>Album</h3>
            </Link>

            <Link className='nav-link m-2' to="/hashtag-generate">
              <i class="fa-solid fa-hashtag fa-2xl m-3"></i>
              <h3>Hashtag</h3>
            </Link>
          </nav>
        </div>
      </div>

    </Router>
  );
}

export default App;


