const Tweet = (props) => {
  return (
    <div>
      <h1>{props.username}</h1>
      <span>{props.name}</span>
      <p>{props.message}</p>
      <span>{props.date}</span>
    </div>
  );
};
