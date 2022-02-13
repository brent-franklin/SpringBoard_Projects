//Import React for Component
import React from 'react';

  // create array of boxes and add css class/styling tag for background color
const Box = ({color, i}) => (
      <li className="box" style={{ backgroundColor: color }}>
        {i + 1}
      </li>
    );

export default Box;
