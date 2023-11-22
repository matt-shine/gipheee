import './App.css'

import { useEffect, useState } from 'react';

import SearchBar from './components/SearchBar';
import Results from './components/Results';

import { Gif } from './types/gif';
import NextPageButton from './components/NextPageButton';

const TRENDING_ENDPOINT = 'https://api.giphy.com/v1/gifs/trending';
const SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = '0wCnAQWWFrx2aVUGxuGKceXpTn3w30SS';
const PAGE_SIZE = 50;

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Gif[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);

  const doFetch = async (queryString: string) => {
    const params = new URLSearchParams({
      api_key: API_KEY,
      limit: PAGE_SIZE.toString(),
      // add query & offset if necessary
      ...(queryString ? { q: queryString } : {}),
      ...(offset ?  { offset: offset.toString() } : {})
    });

    const url = queryString ? SEARCH_ENDPOINT : TRENDING_ENDPOINT;

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      const message = `An error occurred fetching trending gifs: ${response.status}`;
      throw new Error(message);
    }

    const { data, pagination } = await response.json();

    setTotalResults(pagination.total_count);
    setOffset(pagination.offset + PAGE_SIZE);
    
    const newResults = data.map((d) => { 
      const { url, height, width } = d.images.fixed_height;
      return {
        id: d.id,
        url,
        height,
        width
      }
    });
      
    // Didn't have time to figure out exactly why I would sometimes get duplicates in results, so this is more of a quick fix
    const dedupedResults =[...results, ...newResults].filter((value, index, self) => index === self.findIndex((t) => (t.id === value.id)));
    
    setResults(dedupedResults);
  }

  const handleQueryChanged = (newQuery: string) => {
    setResults([]);
    setQuery(newQuery);
  }

  useEffect(() => {
    doFetch(query);
  }, [query])

  const handleLoadNextPage = () => {
    doFetch(query);
  }

  return (
    <main>
      <SearchBar onChange={handleQueryChanged} />
      <Results gifs={results} />
      <NextPageButton onClick={handleLoadNextPage} disabled={offset > totalResults} />
    </main>
  )
}

export default App
