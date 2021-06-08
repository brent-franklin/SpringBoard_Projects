const App = () => [
  <Person
    name="Brent"
    age="31"
    hobbies={["Programming", "Music", "Cooking"]}
  />,
  <Person name="Evie" age="5" hobbies={["Unicorns", "Cartoons", "Drawing"]} />,
  <Person name="Jennifer" age="31" hobbies={["Traveling", "Art", "Cooking"]} />,
];

ReactDOM.render(<App />, document.getElementById("root"));
