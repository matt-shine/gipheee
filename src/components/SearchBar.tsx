type SearchBarProps = unknown;

const SearchBar: React.FC<SearchBarProps> = () => {
  return (
    <>
      <input type="text" autoComplete="off" placeholder="Search for awesome gifs..." />
    </>
  )
}

export default SearchBar;