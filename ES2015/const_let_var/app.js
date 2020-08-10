/*
Example of ES5
Global Constants
var PI = 3.14;
PI = 42; //stop this from reassigning a value
*/


//Example of ES2015
const PI = 3.14;
PI = 42; //This with throw an error


//let and const quiz
/*
1. What is the difference between var and let?
- var is functions scoped, let is block scoped.
- var hoists the variables while let does not, but you can delare let before assigning a value.
- var can be redeclared but let can only be reassigned a value.

2. What is the difference between var and const?
- var is function scoped, let is block scoped.
- var can be redeclared and reassigned values, but const cannot
- var can be declared without a value, const cannot
- var hoists variables but const does not

3. What is the difference between let and const?
- let can be declared without an initial value, const cannot
- let can be reassigned values whereas const cannot be reassigned.

4. What is hoisting
- When the code is executed the variable is declared wihtout its initial value before any of the code is run,
     even if a value was set was set. 
     
- It will only be able to see that value once the execution has reached the declared value while reading the code, 
    otherwise it wont see it if called before the declaration and it will show as undefined. 
*/