import { calculateRevPolNotation } from './index.js';

describe('calculateRevPolNotation', () => {
  test('adds two numbers', () => {
    const result = calculateRevPolNotation('3 4 +');
    expect(result).toBe(7);
  });

  test('calculates 3 - (4 x 5)', () => {
    const result = calculateRevPolNotation('3 4 5 x -');
    expect(result).toBe(-17);
  });

  test('calculates 15 7 1 1 + − ÷ 3 × 2 1 1 + + −', () => {
    const result = calculateRevPolNotation('15 7 1 1 + - / 3 x 2 1 1 + + -');
    expect(result).toBe(5);
  });

  test('calculates 17 0 +', () => {
    const result = calculateRevPolNotation('17 0 +');
    expect(result).toBe(17);
  });

  test('calculates 17 5 %', () => {
    const result = calculateRevPolNotation('17 5 %', { '%': (a, b) => a % b });
    expect(result).toBe(2);
  });

  test('calculates 17 5 3 ^', () => {
    const result = calculateRevPolNotation('17 5 3 ^', {
      '^': (a, b, c) => a + b + c,
    });
    expect(result).toBe(25);
  });

  test('calculates 2 17 5 3 ^ x', () => {
    const result = calculateRevPolNotation('2 17 5 3 ^ x', {
      '^': (a, b, c) => a + b + c,
    });
    expect(result).toBe(50);
  });

  test('calculates 5 10 2 u', () => {
    const result = calculateRevPolNotation('5 10 2 u', {
      u: (a, b, c) => (b > c ? b : a),
    });
    expect(result).toBe(10);
  });

  test('calculates 5 2 10 u', () => {
    const result = calculateRevPolNotation('5 2 10 u', {
      u: (a, b, c) => (b > c ? b : a),
    });
    expect(result).toBe(5);
  });
});
