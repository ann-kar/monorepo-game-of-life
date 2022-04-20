import { useState } from 'react';
import styles from './button.module.css';

/* eslint-disable-next-line */
export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button(props: ButtonProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    props.onClick();
    if (props.label !== 'tick' && props.label !== 'restart')
      setIsClicked(!isClicked);
  };

  return (
    <button
      className={`${styles.button} ${isClicked && styles.activeButton}`}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
}

export default Button;
