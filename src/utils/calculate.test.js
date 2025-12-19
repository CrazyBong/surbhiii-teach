import { calculate, formatDisplay, isValidNumber, toPercentage } from './calculate';

describe('calculate utility functions', () => {
  describe('calculate', () => {
    test('adds two numbers correctly', () => {
      expect(calculate(2, 3, '+')).toBe(5);
    });

    test('subtracts two numbers correctly', () => {
      expect(calculate(5, 3, '-')).toBe(2);
    });

    test('multiplies two numbers correctly', () => {
      expect(calculate(4, 3, '*')).toBe(12);
    });

    test('divides two numbers correctly', () => {
      expect(calculate(8, 2, '/')).toBe(4);
    });

    test('throws error for division by zero', () => {
      expect(() => calculate(5, 0, '/')).toThrow('Division by zero');
    });

    test('throws error for unknown operator', () => {
      expect(() => calculate(5, 2, '^')).toThrow('Unknown operator: ^');
    });
  });

  describe('formatDisplay', () => {
    test('formats regular numbers correctly', () => {
      expect(formatDisplay(123)).toBe('123');
      expect(formatDisplay(123.45)).toBe('123.45');
    });

    test('handles Infinity values', () => {
      expect(formatDisplay('Infinity')).toBe('Error');
      expect(formatDisplay('-Infinity')).toBe('Error');
    });

    test('handles NaN values', () => {
      expect(formatDisplay('NaN')).toBe('Error');
    });

    test('formats large numbers with exponential notation', () => {
      expect(formatDisplay('1234567890123')).toContain('e+');
    });
  });

  describe('isValidNumber', () => {
    test('identifies valid numbers', () => {
      expect(isValidNumber(123)).toBe(true);
      expect(isValidNumber('123')).toBe(true);
      expect(isValidNumber(0)).toBe(true);
    });

    test('identifies invalid numbers', () => {
      expect(isValidNumber('abc')).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber(NaN)).toBe(false);
    });
  });

  describe('toPercentage', () => {
    test('converts number to percentage', () => {
      expect(toPercentage(50)).toBe(0.5);
      expect(toPercentage(100)).toBe(1);
      expect(toPercentage(0)).toBe(0);
    });
  });
});