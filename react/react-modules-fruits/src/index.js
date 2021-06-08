import foods from "./foods";
import { choice, remove } from "./helpers";

const fruit = choice(foods);

console.log(`I'd like one ${fruit}, please.`);
console.log(`Here you go: ${fruit}`);
console.log(`Delicious! May I have another?`);

const fruitsLeft = remove(fruit, foods);

console.log(`I'm sorry, we're all out. We have ${fruitsLeft.length} left`);
