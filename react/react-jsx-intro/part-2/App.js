const App = () => [
  <Tweet
    username="User1"
    name="Brent"
    date={new Date().toDateString()}
    message="My first tweet!!!"
  />,
  <Tweet
    username="User1"
    name="Brent"
    date={new Date().toDateString()}
    message="My second tweet!!!"
  />,
  <Tweet
    username="User1"
    name="Brent"
    date={new Date().toDateString()}
    message="My third tweet!!!"
  />,
];

ReactDOM.render(<App />, document.getElementById("root"));
