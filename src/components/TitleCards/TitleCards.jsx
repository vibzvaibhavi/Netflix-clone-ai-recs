import React, { useRef, useEffect, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category, genre }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDRlYTMzM2JkMzE1YmU4MjJjNDc0NDZlZTI3ZmI1ZiIsIm5iZiI6MTc1MTYwOTg0OS42NDcsInN1YiI6IjY4Njc3MWY5MWQyNGM4ZDU2ZjliYzdkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8_Fn63CjkwYq_gMALPVIlNNryWPOULTESfFR1e3j_1k'
    }
  };

  // ✅ Genre ID map
  const genreIdMap = {
    Action: 28,
    Adventure: 12,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    Romance: 10749
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    let url = '';

    if (genre) {
      const genreId = genreIdMap[genre];
      url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`;
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);

    // Cleanup
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category, genre]);

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt=""
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
