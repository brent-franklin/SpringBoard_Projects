/*
  Object Destructuring 1

  What does the following code return/print?
*/


  // let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
  // let {numPlanets, yearNeptuneDiscovered} = facts;

  // console.log(numPlanets); // ?
  // console.log(yearNeptuneDiscovered); // ?

  // numPlanets returns/prints 8 and yearNeptuneDiscovered returns/prints 1846


/*
  Object Destructuring 2

  What does the following code return/print?
*/
  
  let planetFacts = {
    numPlanets: 8,
    yearNeptuneDiscovered: 1846,
    yearMarsDiscovered: 1659
  };

  let {numPlanets, ...discoveryYears} = planetFacts;

  console.log(discoveryYears); // ?

// this code returns/prints {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}


/*
  Object Destructuring 3

  What does the following code return/print?
*/

function getUserData({firstName, favoriteColor="green"}){
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

getUserData({firstName: "Alejandro", favoriteColor: "purple"}) 
// This returns/prints "Your name is Alejandro and you like purple"
getUserData({firstName: "Melissa"}) 
// This returns/prints "Your name is Melissa and you like green"
getUserData({}) 
// This returns/prints "Your name is undefined and you like green"


/*
  Array Destructuring 1

  What does the following code return/print?
*/

let [first, second, third] = ["Maya", "Marisa", "Chi"];

console.log(first); 
// This prints/returns "Maya" becuase the new variable let first = 'Maya';
console.log(second); 
// This prints/returns "Marisa" because of the new variable let second = 'Marisa';
console.log(third); 
// This prints/returns "Chi" because of the new variable let third = 'Chi';


/*
  Array Destructuring 2

  What does the following code return/print?
*/

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]

console.log(raindrops);
// This prints/returns "Raindrops on roses" 
// becuase of the new variable, let raindrops = 'Raindrops on roses';
console.log(whiskers); 
// This prints/returns "Whiskers on kittens" 
// becuase of the new variable, let whiskers = 'whiskers on kittens';
console.log(aFewOfMyFavoriteThings); 
// This prints/returns the remaining items in an array 
// [  
//   "Bright copper kettles",
//   "warm woolen mittens",
//   "Brown paper packages tied up with strings"
// ]
// becuase of the new array, let aFewOfMyFavoriteThings = [
//   "Bright copper kettles",
//   "warm woolen mittens",
//   "Brown paper packages tied up with strings"
// ]


/*
  Array Destructuring 3

  What does the following code return/print?
*/

let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers)
// This prints/returns a new array "[10, 30, 20]"
// Becuase of the mutated array let numbers = [10, 20, 30] into [10, 30, 20],


/*
  ES2015 Refactoring

  In this exercise, you’ll refactor some ES5 code into ES2015.
  ES5 Assigning Variables to Object Properties
*/

  var obj = {
      numbers: {
          a: 1,
          b: 2
      }
  };

  /*
  var a = obj.numbers.a;
  var b = obj.numbers.b;
*/

// ES2015 Syntax
const {a,b} = obj.numbers;


/*
  ES5 Array Swap
*/

  var arr = [1, 2];
  // var temp = arr[0];
  // arr[0] = arr[1];
  // arr[1] = temp;
 
//ES2015 Syntax
[arr[0], arr[1]] = [arr[1], arr[0]];


/*
  raceResults()

  Write a function called raceResults which accepts a single array argument. It should return an object with the keys first, second, third, and rest.

          first: the first element in the array
          second: the second element in the array
          third: the third element in the array
          rest: all other elements in the array

  Write a one line function to make this work using

          An arrow function
          Destructuring
          ‘Enhanced’ object assignment (same key/value shortcut)
*/


//ES2015 Syntax
const raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest});


raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre'])

/*
{
  first: "Tom",
  second: "Margaret",
  third: "Allison",
  rest: ["David", "Pierre"]
}
*/