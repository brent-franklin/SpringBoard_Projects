const App = () => (
  <div>
    <FirstComponent />
    <NamedComponent name="Brent" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
