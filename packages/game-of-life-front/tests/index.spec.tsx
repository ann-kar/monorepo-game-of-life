import { fireEvent, render, getByTestId, getAllByRole} from '@testing-library/react';

import Index from '../pages/index';


describe(Index.name, () => {
    it('should display an empty table after clicking start', () => {
    const context = render(<Index />);
    const buttons = getAllByRole(context.container, "button");
    const board = getByTestId(context.container, "board");
    fireEvent.click(buttons[0]);
    expect(board).toMatchSnapshot();
    })

    it('should display a table with default settings after clicking start (default)', () => {
       const context = render(<Index />);
        const buttons = getAllByRole(context.container, "button");
        const board = getByTestId(context.container, "board");
        fireEvent.click(buttons[1]);
        expect(board).toMatchSnapshot();
        })
});
