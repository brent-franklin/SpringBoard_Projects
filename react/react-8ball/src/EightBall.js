import React, { useState } from 'react';
import Button from './Button';
import './styles/EightBall.css';

/*
  Eightball will have two buttons, one for answers and one to reset
  Two pieces of state are used for the color and the message
 */
const EightBall = ({ answers }) => {
    // Random index to chose random color
  const randNum = Math.floor(Math.random() * answers.length);
    // get message and setMessage function
  const [msg, setMsg] = useState("Think of a Question");
    // get color and setColor function
  const [color, setColor] = useState("black");
    // If 8ball is clicked it rerenders with new color and msg
  const answerQuestion = () => {
      setMsg(answers[randNum].msg); 
      setColor(answers[randNum].color);
  };
    // if reset is clicked then 8ball goes back to original msg
  const resetBall = () => {
      setMsg("Think of a Question");
      setColor("black");
  };
  return (
    <>
	<div
	    className="eightball"
            style={{backgroundColor: color}}
            onClick={answerQuestion}
	>
	    <h2>{msg}</h2>
	</div>
	<Button
	    className="btn-answer"
	    value={"Reset"}
	    action={resetBall}
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
