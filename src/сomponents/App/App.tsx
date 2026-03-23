import { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false)
      const result = await fetchMovies(query);
      setMovies(result);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <ul>
          {movies.map(({ id, poster_path, title }) => (
            <li key={id}>
              <a href={poster_path} target="_blank">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
}

export default App;
