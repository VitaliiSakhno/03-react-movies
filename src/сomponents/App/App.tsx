import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    const result = await fetchMovies(query);
    setMovies(result);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}

export default App;
