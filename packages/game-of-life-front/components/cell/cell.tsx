import styles from './cell.module.css';

export interface CellProps {
  isActive: boolean;
}

export function Cell(props: CellProps) {
  return (
      <div className={`${styles.cell} ${props.isActive && styles.activeCell}`}/>
  );
}

export default Cell;
