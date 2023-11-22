import { ChangeEvent } from "react";
import debounce from "../util/debounce";

type SearchBarProps = {
  onChange: (q: string) => void
};

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {

  // Debounce - we don't want to get rate limited!
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div className="search">
      <input type="text" autoComplete="off" placeholder="Search for awesome gifs..." onChange={debounce(handleChange, 300)} />
    </div>
  )
}

export default SearchBar;