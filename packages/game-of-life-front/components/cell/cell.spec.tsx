import { render } from '@testing-library/react';

import Cell from './cell';

describe('Cell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cell isActive={false} setCell={function (row: number, col: number): void {
      throw new Error('Function not implemented.');
    } } row={0} col={0} />);
    expect(baseElement).toBeTruthy();
  });
});
