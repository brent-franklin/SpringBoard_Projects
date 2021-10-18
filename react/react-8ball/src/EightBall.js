import React, { useState } from 'react';
import './styles/EightBall.css';

const EightBall = ({ answers }) => {
  const initialState = {
    initialMsg: 'Think of a Question',
    initialColor: 'black',
  };

  const randNum = Math.floor(Math.random() * answers.length);
  const [{ initialMsg, initialColor }] = useState(initialState);
  const { msg, color } = answers[randNum];
  const [firstMsg, setMsg] = useState(initialMsg);
  const [firstColor, setColor] = useState(initialColor);
  return (
    <>
      <div
        className="eightball"
        style={{
          backgroundColor: firstColor,
        }}
      >
        <h2>{firstMsg}</h2>
        <button
          className="answer"
          onClick={() => {
            setMsg(msg);
            setColor(color);
          }}
        >
          Answer
        </button>
      </div>
      <button
        className="reset"
        onClick={() => {
          setMsg(initialMsg);
          setColor(initialColor);
        }}
      >
        Reset
      </button>
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
