import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [showDescription, setDescription] = useState("");
  const [showTitle, setTitle] = useState("");
  const [clickCount, setClickCount] = useState(0);


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("http://localhost:3000/api/random-movies");
      setMovies(request.data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie  ) => {
    // Aqui debería registrarse el historial, con movie.id
    // Por ejemplo: axios.get("http://localhost:3001/historial/nuevo/"+movie.id);
    let response = await axios.get("http://localhost:3003/record/"+movie.id);
    console.log(response);
    setDescription(movie.overview);
    setTitle(movie.title);
    setClickCount(clickCount + 1);
    if (clickCount % 3 === 0) {
      const recommendationRequest = await axios.get("http://localhost:3500/api/recommendation");
      setMovies((prevMovies) => [...prevMovies, ...recommendationRequest.data]);
    }
  };

  // Datos a mostrar (TMDB):
  // movie
  //    id
  //    name
  //    poster_path
  //    backdrop_path


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            movie.backdrop_path !== null && (
              <img
                onClick={() => handleClick(movie, isLargeRow)}
                key={movie.id}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
      
      {showTitle && (
        <div className="trailer-box">
          <div>Movie: {showTitle}</div>
          <div>Description: {showDescription}</div>
        </div>
      )}
    </div>
  );
}

export default Row;