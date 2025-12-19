/**
 * Calculator utility functions
 * Contains pure functions for mathematical operations
 */

/**
 * Performs calculation based on operator
 * @param {number} a - First operand
 * @param {number} b - Second operand
 * @param {string} operator - Mathematical operator (+, -, *, /)
 * @returns {number} Result of operation
 */
export const calculate = (a, b, operator) => {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      // Handle division by zero
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};

/**
 * Formats a number for display
 * @param {number|string} value - Number to format
 * @returns {string} Formatted number string
 */
export const formatDisplay = (value) => {
  // Convert to string if it's a number
  const stringValue = typeof value === 'number' ? value.toString() : value;
  
  // Handle special cases
  if (stringValue === 'Infinity' || stringValue === '-Infinity') {
    return 'Error';
  }
  
  if (stringValue === 'NaN') {
    return 'Error';
  }
  
  // Limit display length to prevent overflow
  if (stringValue.length > 12) {
    // Check if it's a decimal number
    if (stringValue.includes('.')) {
      // Try to round to fit within display limit
      const num = parseFloat(stringValue);
      if (Math.abs(num) < 0.000001 && num !== 0) {
        // Very small number, use exponential notation
        return num.toExponential(6);
      } else {
        // Round to fixed decimal places
        return parseFloat(num.toFixed(10)).toString();
      }
    } else {
      // Large integer, use exponential notation
      const num = parseFloat(stringValue);
      return num.toExponential(6);
    }
  }
  
  return stringValue;
};

/**
 * Checks if a value is a valid number
 * @param {*} value - Value to check
 * @returns {boolean} True if value is a valid number
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Handles percentage conversion
 * @param {number} value - Value to convert to percentage
 * @returns {number} Percentage value
 */
export const toPercentage = (value) => {
  return value / 100;
};