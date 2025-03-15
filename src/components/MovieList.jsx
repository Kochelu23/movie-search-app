import { useState } from 'react';
import MovieDetailsModal from './MovieDetailsModal';

const MovieList = ({ movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <>
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="movie-card"
            onClick={() => setSelectedMovieId(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>

      {selectedMovieId && (
        <MovieDetailsModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </>
  );
};

export default MovieList;