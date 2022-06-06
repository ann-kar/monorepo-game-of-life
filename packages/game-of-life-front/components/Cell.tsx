import { ICell } from '@gol-monorepo/interfaces';
import { useState } from 'react';

export function Cell({ isActive, row, col, handleCellClick }: ICell) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    setIsClicked(!isClicked);
    handleCellClick({ row: row, col: col });
  };

  return (
    <div
      data-testid="cell"
      onClick={handleClick}
      className={`w-10 h-10 max-w-[10vw] max-h-[10vw] border border-white ${
        isActive || isClicked ? 'bg-emerald-500' : 'bg-gray-100'
      }`}
    />
  );
}

export default Cell;
