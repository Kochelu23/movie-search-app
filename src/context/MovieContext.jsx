import { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <MovieContext.Provider value={{ movies, setMovies, loading, setLoading, error, setError }}>
      {children}
    </MovieContext.Provider>
  );
};