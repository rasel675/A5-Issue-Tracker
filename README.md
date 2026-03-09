
    - 1️⃣ What is the difference between var, let, and const?

    Answer:

Var--->
1. var is Function-scoped
2. Var can redclare and reassign
3. It isn't block scoped
4. Old Style, les safe


let--->

1. let is block-scoped
2. It cannot redeclare but can reassign
3.Modern, Safer then var
4. it preferred for variables that change

const--->

1. const is Block-scoped
2. const cannot redeclare and can't reassign
3. const preferred for constants
4. Object/array inside can change  



    - 2️⃣ What is the spread operator (...)?

    Answer:

    The spread operator (...) is used to expand an array or object into individual elements or properties. It allows you to copy, merge, or pass items to functions without changing the original data.

   Example:   const arr1 = [1, 2, 3];
              const arr2 = [...arr1, 4, 5];   // output: [1, 2, 3, 4, 5]
           


    - 3️⃣ What is the difference between map(), filter(), and forEach()?

   Answer:

> map() makes a new array by changing each item, but the original array stays the same.

> filter() makes a new array with only the items that match a condition.

> forEach() just runs a function on each item, it does not make a new array.

   Example:
   
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);
// map() - Returns new array, original unchanged
console.log(doubled); 
//output: [2, 4, 6, 8]
console.log(numbers);
 //output: [1, 2, 3, 4] (original unchanged)


const evens = numbers.filter(n => n % 2 === 0); 
// filter() - Returns new array with matching items
console.log(evens); 
// output: [2, 4]

numbers.forEach(n => console.log(n)); 
// forEach() - Returns nothing, just loops
// Output: 1 2 3 4



    - 4️⃣ What is an arrow function?
   
   Answer:

>  An arrow function is a shorter way to write a function in JavaScript, introduced in ES6. It uses the `=>`syntax instead of the `function` keyword.

   Example:      const sum = (a, b) => a + b;
                 // It’s a short way to write a function.
                 console.log(sum(2, 3)); 

                 output : 5
    

    - 5️⃣ What are template literals?

Answer:

> Template literals are strings written using backticks (). They let you include variables directly inside the string with ${}. You don’t need to use +` to join strings and variables. They also make writing multiple lines very easy. This makes strings more readable and convenient.

Example:
const name = "Manon";
const greeting = `Hello, my name is ${name}`;
console.log(greeting)

output: Hello, my name is Manon


