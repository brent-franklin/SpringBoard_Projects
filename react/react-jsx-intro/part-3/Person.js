const Person = (props) => {
  return (
    <div>
      <p>Learn some information about this person</p>
      <h3>{props.age >= 18 ? "please go vote!" : "you must be 18"}</h3>
      <ul>
        <li>Name: {props.name.slice(0, 6)}</li>
        <li>Age: {props.age}</li>
        <ul>
          {props.hobbies.map((hobby) => (
            <li>{hobby}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
