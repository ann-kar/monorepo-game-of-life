import { useState } from 'react';

export interface CellProps {
  isActive: boolean;
  setCell?: (row: number, col: number) => void;
  row?: number;
  col?: number;
}

export function Cell(props: CellProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (props.setCell) {
      props.setCell(props.row, props.col);
      setIsClicked(!isClicked);
    }
  };
  return (
    <div
      data-testid="cell"
      onClick={handleClick}
      className={`w-10 h-10 border border-gray-300 ${
        props.isActive && 'bg-emerald-500'
      }`}
    />
  );
}

export default Cell;
