import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Index from '../pages/index';
import IndexContext from '../pages/index';

describe.only('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />);
    expect(baseElement).toBeTruthy();
  });

  describe('handles events by rendering the required elements', () => {
    let context;

    beforeEach(() => {
      context = render(<Index />);
    });

    it('should render only start, restart, and default buttons before the game', () => {
      const startButton = context.getByTestId('start');
      const defaultButton = context.getByTestId('default');

      expect(startButton).not.toBeNull();
      expect(defaultButton).not.toBeNull();
    });

    it('should render tick and autoplay buttons once the game has started', () => {
      // when

      const startButton = context.getByTestId('start');
      fireEvent.click(startButton);

      // then
      const tickButton = context.findByTestId('tick');
      const autoplayButton = context.findByTestId('autoplay');

      expect(tickButton).not.toBeNull();
      expect(autoplayButton).not.toBeNull();
    });
  });
});
