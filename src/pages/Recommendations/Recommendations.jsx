// src/pages/Recommendations/Recommendations.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TitleCards from '../../components/TitleCards/TitleCards';
import './Recommendations.css'; // Add your styles here!

const Recommendations = () => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = ['Action', 'Comedy', 'Drama', 'Romance', 'Horror', 'Adventure'];

  const handlePick = () => {
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    setSelectedGenre(randomGenre);
  };

  return (
    <div className="recommendations-page">
      <h1>🎥 AI Picks Just for You</h1>

      <button className="surprise-btn" onClick={handlePick}>
        ✨ Surprise Me with a Genre
      </button>

      {selectedGenre && (
        <TitleCards title={`Top ${selectedGenre} Movies`} genre={selectedGenre} />
      )}

      <div className="back-home">
        <Link to="/">
          <button className="back-btn">⬅️ Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Recommendations;
