import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("http://localhost:3000/api/random-movies");
      setMovies(request.data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie, isLargeRow) => {
    // Aqui debería registrarse el historial, con movie.id
    // Por ejemplo: axios.get("http://localhost:3001/historial/nuevo/"+movie.id);
    let response = await axios.get("http://localhost:3003/record/"+movie.id);
    console.log(response);
    if (trailerUrl) {
      setTrailerUrl("");
    } else if (!isLargeRow) {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      console.log(`/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`);
      setTrailerUrl(trailerurl.data.results[0]?.key);
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
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;