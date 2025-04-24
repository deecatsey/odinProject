// The Fibonacci sequence is the series of numbers where each number is the sum of the two preceding numbers.

// iteration
const fibs = (number) => {
  const fibSequence = [];

  while (fibSequence.length < number) {
    if (fibSequence.length < 2) {
      fibSequence.push(0);
      fibSequence.push(1);
    }

    const [first, second] = fibSequence.slice(-2);
    fibSequence.push(first + second);
  }

  return fibSequence;
};

// recursion
const fibsRec = (number) => {
  if (number <= 1) {
    return [0];
  }
  if (number === 2) {
    return [0, 1];
  }

  const fibSequence = fibsRec(number - 1);
  const newNumber =
    fibSequence[fibSequence.length - 1] + fibSequence[fibSequence.length - 2];
  fibSequence.push(newNumber);

  return fibSequence;
};

const iterativeFibs = fibs(8); // [0, 1, 1, 2, 3, 5, 8, 13].
console.log("Iterative fibs", iterativeFibs);

const recursiveFibs = fibsRec(8);
console.log("Recursive fibs", recursiveFibs);
