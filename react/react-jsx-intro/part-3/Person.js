const Person = ({ name, age, hobbies }) => {
  return (
    <div>
      <p>Learn some information about this person</p>
      <h3>{age >= 18 ? "please go vote!" : "you must be 18"}</h3>
      <ul>
        <li>Name: {name.length > 8 ? name.slice(0, 6) : name}</li>
        <li>Age: {age}</li>
        <ul>
          {hobbies.map((hobby) => (
            <li>{hobby}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
