import React, { useState } from 'react';
import Button from './Button';
import './styles/EightBall.css';

const EightBall = ({ answers }) => {
  const randNum = Math.floor(Math.random() * answers.length);
  const [msg, setMsg] = useState("Think of a Question");
  const [color, setColor] = useState("black");
  const action = () => (
      color === "black"
	  ? (setMsg(answers[randNum].msg), 
	     setColor(answers[randNum].color))
	  : (setMsg("Think of a Question"),
	     setColor("black"))
  )
    
  return (
    <>
	<div
	    className="eightball"
	    style={{backgroundColor: color}}
	>
	    <h2>{msg}</h2>
	</div>
	<Button
	    className="btn-answer"
	    value={color === 'black' ? "Answer" : "Reset"}
	    action={action}
	/>
    </>
  );
};

EightBall.defaultProps = {
  answers: [
    { msg: 'It is certain.', color: 'green' },
    { msg: 'It is decidedly so.', color: 'green' },
    { msg: 'Without a doubt.', color: 'green' },
    { msg: 'Yes - definitely.', color: 'green' },
    { msg: 'You may rely on it.', color: 'green' },
    { msg: 'As I see it, yes.', color: 'green' },
    { msg: 'Most likely.', color: 'green' },
    { msg: 'Outlook good.', color: 'green' },
    { msg: 'Yes.', color: 'green' },
    { msg: 'Signs point to yes.', color: 'goldenrod' },
    { msg: 'Reply hazy, try again.', color: 'goldenrod' },
    { msg: 'Ask again later.', color: 'goldenrod' },
    { msg: 'Better not tell you now.', color: 'goldenrod' },
    { msg: 'Cannot predict now.', color: 'goldenrod' },
    { msg: 'Concentrate and ask again.', color: 'goldenrod' },
    { msg: "Don't count on it.", color: 'red' },
    { msg: 'My reply is no.', color: 'red' },
    { msg: 'My sources say no.', color: 'red' },
    { msg: 'Outlook not so good.', color: 'red' },
    { msg: 'Very doubtful.', color: 'red' },
  ],
};

export default EightBall;
