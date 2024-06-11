import { useState, useEffect } from "react";
const KEY = "1705c9a6";


export function useMovies(query) {
    
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(
        function () {

            // callback?.();
          const controller = new AbortController();
    
          async function fetchData() {
            try {
              setIsLoading(true);
              setError("");
              const response = await fetch(
                `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
    
              if (!response.ok) throw new Error("Network response was not ok");
    
              const data = await response.json();
    
              if (data.Response === "False") throw new Error(data.Error);
    
              setMovies(data.Search);
              // console.log(data.Search);
              setError("");
              setIsLoading(false);
            } catch (err) {
              console.log(err);
              if (err.name === "AbortError") return;
              setError(err);
            } finally {
              setIsLoading(false);
            }
          }
    
          if (!query.length) {
            setMovies([]);
            setError("");
            return;
          }
    
        //   handleCloseMovie();
          fetchData();
    
          return () => {
            controller.abort();
          };
        },
        [query]
      );

      return {movies, isLoading, error};
}