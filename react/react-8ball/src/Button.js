import React from 'react';

// Using input for button
// value = innerText className = css class action = eventListener callback
const Button = ({value, className, action}) => (
    <input value={value} className={className} onClick={action} type="button" />
);

export default Button;
