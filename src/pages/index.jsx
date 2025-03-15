import { useState } from 'react';
import Search from '../components/Search';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { searchMovies } from '../utils/api';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setError(null);

    try {
      const { results, totalResults } = await searchMovies(searchQuery, currentPage);
      setMovies(results);
      setTotalPages(Math.ceil(totalResults / 10));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleSearch(query);
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <Search onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MovieList movies={movies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}