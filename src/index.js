import regeneratorRuntime from 'regenerator-runtime';

export const calculateRevPolNotation = (expression, customOperations = {}) => {
  const tokens = expression.split(' ');
  const defOperations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    x: (a, b) => a * b,
    '/': (a, b) => a / b,
  };
  const operations = { ...defOperations, ...customOperations };
  const stack = [];

  const isOperator = (token) => {
    return token in operations;
  };

  for (const token of tokens) {
    if (isOperator(token)) {
      const numberOfOperands = operations[token].length;
      const operands = [];
      for (let i = 0; i < numberOfOperands; i++) {
        operands.unshift(+stack.pop());
      }
      const result = operations[token](...operands);
      stack.push(result);
    } else {
      stack.push(token);
    }
  }
  return stack[0];
};

const result = calculateRevPolNotation('17 5 2 ^', {
  '^': (a, b, c) => a + b + c,
});
const result2 = calculateRevPolNotation('5 10 2 u', {
  u: (a, b, c) => {
    return b > c ? b : a;
  },
});

console.log(result);
console.log(result2);
