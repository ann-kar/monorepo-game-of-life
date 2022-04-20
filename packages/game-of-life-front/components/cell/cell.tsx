import { useState } from 'react';
import styles from './cell.module.css';

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
      onClick={handleClick}
      className={`${styles.cell} ${
        (props.isActive || isClicked) && styles.activeCell
      }`}
    />
  );
}

export default Cell;
