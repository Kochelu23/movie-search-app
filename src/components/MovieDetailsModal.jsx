import { useEffect, useState } from 'react';

const MovieDetailsModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=38192e22&i=${movieId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        if (data.Error) {
          throw new Error(data.Error);
        }
        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; Close
        </button>
        <h2>{movieDetails.Title}</h2>
        <p>{movieDetails.Year}</p>
        <p>{movieDetails.Genre}</p>
        <p>{movieDetails.Plot}</p>
        <p>Director: {movieDetails.Director}</p>
        <p>Actors: {movieDetails.Actors}</p>
        <p>IMDb Rating: {movieDetails.imdbRating}</p>
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
      </div>
    </div>
  );
};

export default MovieDetailsModal;