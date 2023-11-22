import ResultItem from "./ResultItem";

type ResultsProps = {
  gifs: Gif[]
};

const Results: React.FC<ResultsProps> = ({ gifs }) => {
  return (
    <div className="results">
      {gifs.map((gif) => <ResultItem gif={gif} key={gif.id} />)}
    </div>
  )
}

export default Results;