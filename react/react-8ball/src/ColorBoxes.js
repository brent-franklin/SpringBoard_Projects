import React, { useState } from 'react';
import './styles/ColorBoxes.css';

const ColorBoxes = ({ colors }) => {
  for (let i = 1; i < colors.length; i++) {
    const randInt = Math.floor(Math.random() * i);
    [colors[i - 1], colors[randInt]] = [colors[randInt], colors[i - 1]];
  }
  const colorBoxes = colors.map((color, i) => {
    return (
      <div key={i} className="box" style={{ backgroundColor: color }}>
        {i + 1}
      </div>
    );
  });
  const randInt2 = Math.floor(Math.random() * colors.length);
  const [color, setColor] = useState(colors[randInt2]);
  const [box, setBox] = useState(document.getElementById('color-box').children[randInt2]);
  return (
    <>
      <div id="color-box">{colorBoxes}</div>
      <input
        type="button"
        className="color-btn"
        value="Change"
        onClick={() => {
          box.backgroundColor = color;
        }}
      />
    </>
  );
};

ColorBoxes.defaultProps = {
  colors: [
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
  ],
};

export default ColorBoxes;
