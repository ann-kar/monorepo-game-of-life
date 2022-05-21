import { Children, ReactNode } from 'react';
import styles from './menu.module.css';

/* eslint-disable-next-line */
export interface MenuProps {
  children: ReactNode;
}

export function Menu(props: MenuProps) {
  return (
    <div className="flex justify-center">
      {props.children}
    </div>
  );
}

export default Menu;
