import React from 'react';

const Button = ({value, className, action}) => (
    <input value={value} className={className} onClick={action} type="button" />
);

export default Button;
