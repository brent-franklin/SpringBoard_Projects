import React from 'react';
import Box from './Box';
import Button from './Button';
import './styles/ColorBoxes.css';

// Color Boxes
/*
  - This will create a box for every color in the color list
  - It will randomize the list of colors to receive a random order
  each time it renders the component
  - It will use map to create an array of div elements, add a css class,
  and add the background color from the randomized colors available
*/
const ColorBoxes = ({ colors }) => {
    /*
      To change the color of a single box I dont need to use state
      and its easier to just select the box and change the color
      using javascript Style attribute and the list of colors
      w/ a randomized index
     */
    const changeColor = () => {
	// One random index for color and box so the colors and the boxes
	// don't always match up by their index number 
	const randIndex1 = Math.floor(Math.random() * colors.length);
	const randIndex2 = Math.floor(Math.random() * colors.length);

	// Grab all boxes once rendered and event is fired
	const randBox = document.querySelectorAll('.box')[randIndex1];
	// Set random box to random color from color array
	randBox.style.backgroundColor = colors[randIndex2];
    };
    
    
  return (
    <>
	<ul id="color-box">
	  {colors.map((color, i, arr) =>
	      <Box className="box"
		   key={`${i}${color}`}
		   color={color}
		   colors={arr}
		   i={i}
	      />)}
	</ul>
	<Button
	    className="btn-color"
	    value="Change Color"
	    action={changeColor}
	/>
    </>
  );
};

const colors = [
    '#fbf1c7',
    '#cc241d',
    '#98971a',
    '#d79921',
    '#458588',
    '#b16286',
    '#689d6a',
    '#7c6f64',
    '#d65d0e',
    '#fb4934',
    '#fabd2f',
    '#83a598',
    '#d3869b',
    '#8ec07c',
    '#7c6f64',
    '#fe8019',
]; 


/*
  randomizedColors();
  1. Randomize the colors in the color array
  2. Set random number so it cannot go above colors array length	
  3. Go through each index and swap with a prior
     random index until the end of the array	
*/
colors.forEach((_c, i, arr) => {  
    const randIndex = Math.floor(Math.random() * i);
    [arr[i - 1], arr[randIndex]] = [arr[randIndex], arr[i - 1]];
});

// Default props for ColorBoxes
ColorBoxes.defaultProps = { colors };

export default ColorBoxes;
