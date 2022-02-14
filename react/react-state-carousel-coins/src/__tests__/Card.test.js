import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';

// Smoke test to make sure the component actually renders
it('loads card without crashing', () => {
  render(<Card />);
});

// Snapshot test to make sure the component renders just like prior rendering
it('matches card snapshot', () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});

