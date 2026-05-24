import { useEffect, useState } from "react";
import "./Autocomplete.css";
import { useDebounceSearch } from "./useDebounceSearch";

const Autocomplete = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const debouncedInput = useDebounceSearch(input);
  const [cache, setCache] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      // cache
      if (cache[debouncedInput]) {
        setResults(cache[debouncedInput]);
        return;
      }
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${debouncedInput}`,
        { signal: controller.signal },
      );
      const data = await res.json();
      setResults(data?.recipes);
      setCache((prev) => ({ ...prev, [debouncedInput]: data?.recipes }));
    };

    fetchData();

    return () => controller.abort();
  }, [debouncedInput]);

  return (
    <div className="container">
      <h1>AUTOCOMPLETE SEARCH</h1>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="results-container">
          {results?.map((result) => {
            return (
              <span className="result" key={result.id}>
                {result.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
