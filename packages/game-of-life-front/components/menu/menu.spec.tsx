import { render } from '@testing-library/react';

import Menu from './menu';

describe('Gamemenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Menu children={''} />);
    expect(baseElement).toBeTruthy();
  });
});
