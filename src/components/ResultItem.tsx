import { useState } from "react";
import { Gif } from "../types/gif";

type ResultItemProps = {
  gif: Gif
};

const ResultItem: React.FC<ResultItemProps> = ({ gif }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const handleLoaded = () => {
    setLoaded(true);
  }
  
  return (
    <div className="gif-wrapper">
      {!loaded && <div className="placeholder" style={{ height: `${gif.height}px`, width: `${gif.width}px` }}></div>}
      <img className={`${!loaded ? 'loading' : ''}`} id={gif.id} src={gif.url} onLoad={handleLoaded} />
    </div>
  )
}

export default ResultItem;