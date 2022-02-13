import React from 'react';
import EightBall from './EightBall';
import ColorBoxes from './ColorBoxes';
import './styles/App.css';

function App() {
  return (
    <div>
      <h1 id="title">Magic 8ball</h1>
	<EightBall />
	<ColorBoxes id="color-box" />
    </div>
  );
}

export default App;
