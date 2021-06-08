function choice(foods) {
  return foods[Math.floor(Math.random() * foods.length)];
}

function remove(food, foods) {
  for (let i = 0; i < foods.length; i++) {
    if (foods[i] === food) {
      foods.splice(i, 1);
      return foods;
    }
  }
}

export { choice, remove };
