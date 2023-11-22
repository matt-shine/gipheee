import './App.css'

import { useEffect, useState } from 'react';

import SearchBar from './components/SearchBar';
import Results from './components/Results';

import { Gif } from './types/gif';

const TRENDING_ENDPOINT = 'https://api.giphy.com/v1/gifs/trending';
const SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = '0wCnAQWWFrx2aVUGxuGKceXpTn3w30SS';

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Gif[]>([]);

  const doFetch = async (queryString: string) => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      limit: "50",
      // add query & offset if necessary
      ...(queryString ? { q: queryString } : {}),
    });

    const url = queryString ? SEARCH_ENDPOINT : TRENDING_ENDPOINT;

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      const message = `An error occurred fetching trending gifs: ${response.status}`;
      throw new Error(message);
    }

    const { data, pagination } = await response.json();
    
    setResults([...results, ...data.map((d) => ({ url: d.images.fixed_height.url, id: d.id }))])
  }

  const handleQueryChanged = (newQuery: string) => {
    setResults([]);
    setQuery(newQuery);
  }

  useEffect(() => {
    doFetch(query);
  }, [query])

  return (
    <main>
      <SearchBar onChange={handleQueryChanged} />
      <Results gifs={results} />
    </main>
  )
}

export default App
