/* jshint esversion: 6 */

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  if (n < 0) {
    return null;
  }
  if (n === 1 || n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
var sum = function(array) {
  var length = array.length
  if (length === 0) {
    return 0;
  }
  var firstNumber = array[0];
  if (length === 1) {
    return firstNumber;
  } else {
    return firstNumber + sum(array.slice(1));
  }
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  if (!array.length) {
    return 0;
  }
  var sum = 0;
  var length = array.length;

  for (var i = 0; i < length; i++) {
    var current = array[i];

    if (Array.isArray(current)) {
      sum += arraySum(current)
    } else {
      sum += current;
    }
  }

  return sum;
};

// 4. Check if a number is even.
var isEven = function(n) {

  if (n === 1 || n === -1) {
    return false;
  } else if (n === 0) {
    return true;
  }

  if (n > 0) {
    return isEven(n - 2);
  } else {
    return isEven(n + 2);
  }
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
var sumBelow = function(n) {

  if (n <= 1 && n >= -1) {
    return 0;
  }

  if (n > 0) {
    return (n - 1) + sumBelow(n - 1);
  } else {
    return (n + 1) + sumBelow(n + 1);
  }
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function(x, y) {

  var nextX, nextY;
  if (x < y) {
    nextX = x + 1
    nextY = y - 1
    if (nextX > nextY) {
      return [];
    }
  } else {
    nextX = x - 1;
    nextY = y + 1;
    if (nextX < nextY) {
      return [];
    }
  }

  if (nextX === nextY) {
    return [nextX];
  } else {
    return [nextX].concat(range(nextX, nextY).concat([nextY]));
  }
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  /**
   * I: A base and an exponent (ints)
   * O: Whatever number base^exp power is
   * E: Negative exponents - inverse! 1/base^exp
   *    Base = 0
   *    Exp = 0
   * C: The base will be >= 0
   *    All are ints
   *
   *
   * exp of 2 -> base * base
   * exp of 3 -> base * base * base
   * exp of 4 -> base * base * base * base
   * etc
   *
   *
   * if the exponent is 0, we return 1
   * if the base is 0, we return 0
   *
   *
   */

  if (exp === 0) {
    return 1;
  } else if (exp === 1) {
    return base;
  }

  if (base === 1 || base === 0) {
    return base;
  }

  if (exp > 0) {
    return base * exponent(base, exp - 1);
  } else {
    // deal with strange float imprecision
    var result = (1 / base) * exponent(base, exp + 1);
    return Number(result.toPrecision(8));
  }

};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  if (n < 1) {
    return false;
  }
  if (n === 2 || n === 1) {
    return true;
  }
  var half = n / 2;
  var roundedHalf = Math.round(half);
  if (half !== roundedHalf) {
    return false;
  }
  return powerOfTwo(half);
};

// 9. Write a function that reverses a string.
var reverse = function(string) {
  if (string.length === 0) {
    return string;
  } else {
    var lastChar = string.slice(-1);
    var remainingString = string.slice(0, -1);
    return lastChar + reverse(remainingString);
  }
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {

  var trimmedString = string.trim();
  var length = trimmedString.length;
  if (length === 1 || length === 0) {
    return true;
  }

  var firstChar = trimmedString[0].toLowerCase();
  var lastChar = trimmedString[length - 1].toLowerCase();
  if (firstChar === lastChar) {
    return palindrome(trimmedString.slice(1, length - 1));
  } else {
    return false;
  }
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {

  if (y === 0) {
    return NaN;
  }
  if (x === 0) {
    return 0;
  }

  var positiveX, positiveY;
  if (x < 0) {
    positiveX = 0 - x;
  } else {
    positiveX = x;
  }

  if (y < 0) {
    positiveY = 0 - y;
  } else {
    positiveY = y;
  }

  if (positiveX < positiveY) {
    return x;
  }

  var difference = positiveX - positiveY;
  if (difference >= positiveY) {
    if ((x < 0 && y > 0) || (x > 0 && y < 0)) {
      return modulo(x + y, y);
    } else {
      return modulo(x - y, y);
    }

  } else {
    if (x < 0) {
      result = 0 - difference;
    } else {
      result = difference;
    }
    return result;
  }
};

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function(x, y) {
  if (x === 0 || y === 0) {
    return 0;
  } else if ((x > 0 && y < 0) || (x < 0 && y < 0)) {
    return (0 - x) + multiply(x, y + 1);
  } else {
    return x + multiply(x, y - 1);
  }
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
var divide = function(x, y) {

  if (y === 0) {
    return NaN;
  }

  if (x > 0 && y < 0) {
    if (x === 0 - y) {
      return -1;
    } else if (x < 0 - y) {
      return 0;
    }
    return -1 + divide(x + y, y);

  } else if (x < 0 && y > 0) {

    if (0 - x === y) {
      return -1;
    } else if (0 - x < y) {
      return 0;
    }
    return -1 + divide(x + y, y);

  } else {
    if (x < 0 && y < 0) {
      x = 0 - x;
      y = 0 - y;
    }

    if (x === y) {
      return 1;
    } else if (x < y) {
      return 0;
    }
    return 1 + divide(x - y, y);
  }
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {

  if (x < 0 || y < 0) {
    return null;
  }

  if (x === 0) {
    return y;
  } else if (y === 0) {
    return x;
  } else if (x === y) {
    return x;
  }

  var bigger, smaller;
  if (x > y) {
    bigger = x;
    smaller = y;
  } else if (x < y) {
    bigger = y;
    smaller = x;
  }

  var remainder = bigger % smaller;
  return gcd(smaller, remainder);
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {

  var str1Length = str1.length;
  var str2Length = str2.length;
  if ((str1Length === 0 && str2Length !== 0) || str1Length !== 0 && str2Length === 0) {
    return false;
  } else if (str1Length === 0 && str2Length === 0) {
    return true;
  }

  var str1FirstChar = str1[0];
  var str2FirstChar = str2[0];
  if (str1FirstChar === str2FirstChar) {
    return compareStr(str1.slice(1, str1Length), str2.slice(1, str2Length));
  } else {
    return false;
  }
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {

  var length = str.length;
  if (length === 1) {
    return [str];
  }

  var firstLetter = str[0];
  var restOfWord = str.slice(1, length);
  return [firstLetter].concat(createArray(restOfWord));

};

// 17. Reverse the order of an array
var reverseArr = function(array) {

  var length = array.length;
  if (length === 0 || length === 1) {
    return array;
  }

  var first = [array[0]];
  var last = [array[length - 1]];
  var remaining = array.slice(1, length - 1);
  return last.concat(reverseArr(remaining)).concat(first);
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
  if (length === 1) {
    return [value];
  }

  return [value].concat(buildList(value, length - 1));
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function(n) {
  if (n === 1) {
    return ['1'];
  }

  var currentItem;
  if (n % 5 === 0 && n % 3 === 0) {
    // current gets 'FizzBuzz'
    currentItem = 'FizzBuzz';
  } else if (n % 5 === 0) {
    currentItem = 'Buzz';
  } else if (n % 3 === 0) {
    currentItem = 'Fizz';
  } else {
    currentItem = n.toString();
  }

  return fizzBuzz(n - 1).concat(currentItem);
};

// 20. Count the occurrence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
  var length = array.length;
  if (length === 0) {
    return 0;
  }

  var firstItem = array[0];
  var restOfArray = array.slice(1, length);
  var tally;
  if (firstItem === value) {
    tally = 1;
  } else {
    tally = 0;
  }

  return tally + countOccurrence(restOfArray, value);
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
  // I: Array and callback
  // O(indiv): Resul of calling callback on an array elem
  // C: Cannot multate the og array
  // E: length of 0 or undef

  // if the array is of length 0
  var length = array.length;
  if (length === 0) {
    return array;
  }
  // otherwise:
    // get the first elemenet
  var first = array[0];
    // get the rest of the array
  var remainingArray = array.slice(1, length);
    // call the callback on the first element
  var resultElement = callback(first);
    // join that result with the recursive call to rest of array
  return [resultElement].concat(rMap(remainingArray, callback));
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
  var total = 0;
  // will occur at most once per function call
  if (obj[key]) {
    total++;
  }

  var value;
  for (var keyEntry in obj) {
    value = obj[keyEntry];
    if (!Array.isArray(value) && typeof value === 'object') {
      total += countKeysInObj(value, key);
    }
  }

  return total;
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
  var val;
  var total = 0;
  for (var key in obj) {
    val = obj[key];
    if (val === value) {
      total++;
    }

    if (!Array.isArray(val) && typeof val === 'object') {
      total += countValuesInObj(val, value);
    }
  }

  return total;
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
  var target = obj[oldKey];
  if (target) {
    obj[newKey] = target;
    delete obj[oldKey];
  }

  var val;
  for (var key in obj) {
    val = obj[key];
    if (!Array.isArray(val) && typeof val === 'object') {
      obj[key] = replaceKeysInObj(val, oldKey, newKey);
    }
  }

  return obj;
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
  if (n < 1) {
    return null;
  } else if (n === 1) {
    return [0, 1];
  }

  var previousSequence = fibonacci(n - 1);
  var previousLength = previousSequence.length;
  addend1 = previousSequence[previousLength - 1];
  addend2 = previousSequence[previousLength - 2];
  return previousSequence.concat(addend1 + addend2);
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
  // we know that fib(0) should be 0
  // also fib(1) should be 1
  // for fib of 2,
    // that's just fib(0) + fib(1)
  // for a fib of 3
  // that's just fib(1) + fib(2)

  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else if (n < 0) {
    return null;
  }

  return nthFibo(n - 1) + nthFibo(n - 2);
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
  //I: array
  //O: array
  //C: smallest test is one word
  //E: -

  // smallest case:
    // array is empty
    // return an empty array
  // otherwise we need to attach the capitalized first element
  // with the remaining array

  var length = array.length;
  if (!length) {
    return [];
  }

  var firstElement = array[0];
  var remaining = array.slice(1, length);
  firstElement = firstElement.toUpperCase();

  return [firstElement].concat(capitalizeWords(remaining));
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {

  var length = array.length;
  if (!length) {
    return [];
  }

  var firstElement = array[0];
  var remaining = array.slice(1, length);
  var firstChar = firstElement[0];
  var restOfWord = firstElement.slice(1, firstElement.length);
  firstElement = firstChar.toUpperCase() + restOfWord;
  return [firstElement].concat(capitalizeFirst(remaining));
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
  // first we iterate the obj
  var sum = 0;
  for (var key in obj) {
    // if some value at a property is even numbered
    var currentVal = obj[key];
    if (currentVal % 2 === 0) {
      sum += currentVal;
    }
    // if some value is an object literal
    if (typeof currentVal === 'object' && !Array.isArray(currentVal)) {
      sum += nestedEvenSum(currentVal);
    }
  }

  return sum;
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
  var accumulator = [];
  // iterate the array
  array.forEach(function(item, i, arr) {
    if (!Array.isArray(item)) {
      accumulator.push(item);
    } else {
      accumulator = accumulator.concat(flatten(item));
    }
  });

  return accumulator;
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj) {
  // keep an object of each letter
  // if some letter key exists
    // obj[key] += 1
  // if it doesn't yet
    // obj[key] = 1;


};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node) {
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function(array, target, min, max) {
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
};
