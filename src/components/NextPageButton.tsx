
type NextPageButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const NextPageButton: React.FC<NextPageButtonProps> = ({ onClick, disabled }) => {
  return (
    <div className="next-page-wrapper">
      <button type="button" onClick={onClick} disabled={disabled}>Show me more!</button>
    </div>
  )
}

export default NextPageButton;