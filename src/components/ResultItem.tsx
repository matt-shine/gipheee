import { useState } from "react";
import { Gif } from "../types/gif";

type ResultItemProps = {
  gif: Gif
};

const ResultItem: React.FC<ResultItemProps> = ({ gif }) => {
  // We listen to the images onload event to know when it's loaded, until it's loaded we'll show a placeholder
  // and set display: none on the image.
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