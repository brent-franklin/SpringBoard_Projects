import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';
import Carousel from './Carousel';

// Smoke test to make sure the component actually renders
it('loads card without crashing', () => {
  render(<Card />);
});

// Snapshot test to make sure the component renders just like prior rendering
it('matches card snapshot', () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});

// Smoke test to make sure the component actually renders
it('loads carousel without crashing', () => {
  render(<Carousel />);
});

// Snapshot test to make sure the component renders just like prior rendering
it('matches carousel snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

  // move forward in the carousel by clicking right arrow
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

it('works when you click on the left arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
    
  // move forward in the carousel by clicking right arrow
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();

  // move forward in the carousel by clicking right arrow
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
  expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

it('hides the left and right arrow at each end of carousel', () => {
    const { queryByTestId } = render(<Carousel />);

    // When component initially renders the left arrow should not display
    expect(queryByTestId('left-arrow')).not.toBeInTheDocument();

    // After clicking the right arrow, the left arrow should display
    fireEvent.click(queryByTestId('right-arrow'));
    expect(queryByTestId('left-arrow')).toBeInTheDocument();
    expect(queryByTestId('right-arrow')).toBeInTheDocument();

    // After one more right click the right arrow should not display
    fireEvent.click(queryByTestId('right-arrow'));
    expect(queryByTestId('right-arrow')).not.toBeInTheDocument();
    
    // After left click the right arrow should display again
    fireEvent.click(queryByTestId('left-arrow'));
    expect(queryByTestId('right-arrow')).toBeInTheDocument();
});
