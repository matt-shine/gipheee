type ResultsProps = {
  gifs: Gif[]
};



const Results: React.FC<ResultsProps> = ({ gifs }) => {
  return (
    <div className="results">
      {gifs.map((gif) => <img key={gif.id} src={gif.url} />)}
    </div>
  )
}

export default Results;