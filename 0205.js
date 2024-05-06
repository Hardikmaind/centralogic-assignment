// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
  
//   readline.question('Enter something: ', userInput => {
//     console.log('User input:', userInput);
//     readline.close();
//   });
  

const numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(number) {
  console.log(number);
});



let result = 10 / "hello"; // This will result in NaN
console.log(result); // Output: NaN


let myVar = null;
console.log(myVar); // Output: null


let x;
console.log(x); // Output: undefined

let y = undefined;
console.log(y); // Output: undefined





const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
  
  readline.question('Enter a number to calculate its factorial: ', userInput => {
    const number = parseInt(userInput);
    if (isNaN(number) || number < 0) {
      console.log('Please enter a valid non-negative number.');
    } else {
      const result = factorial(number);
      console.log(`Factorial of ${number} is:`, result);
    }
    readline.close();
  });
  




  