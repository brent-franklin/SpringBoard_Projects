/*
Example of ES5

ES5 Map Callback

function double(arr) {
  return arr.map(function(val) {
    return val * 2;
  });
}

*make this one line using arrow function syntax
*/


//ES2015 Arrow Function Syntax
const double = arr => arr.map(val => val * 2);

double([1,2,3,4]); // returns [2,4,6,8];


/*
Replace ALL functions with arrow functions:

function squareAndFindEvens(numbers){
  var squares = numbers.map(function(num){
    return num ** 2;
  });
  var evens = squares.filter(function(square){
    return square % 2 === 0;
  });
  return evens;
}
*/


//ES2015 Arrow Function Syntax

const squareAndFindEvens = (numbers) => {
  const squares = numbers.map((num) => num ** 2);
  const evens = squares.filter((square) => square % 2 === 0);
  return evens;
}
squareAndFindEvens([1,2,3,4]) // returns [4,16]

//Ansewr Given
//const squareAndFindEvens = numbers => numbers.map(val => val ** 2).filter(square => square % 2 === 0)
