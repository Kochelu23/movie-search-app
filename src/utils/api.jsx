const API_KEY = '38192e22'; // Ваш ключ OMDb API

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(data.Error);
    }

    return {
      results: data.Search,
      totalResults: parseInt(data.totalResults, 10),
    };
  } catch (error) {
    throw new Error(error.message);
  }
};