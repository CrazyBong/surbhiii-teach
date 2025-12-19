import React, { useReducer, useCallback } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import { calculate, isValidNumber } from '../utils/calculate';

/**
 * Calculator state reducer
 * Manages calculator state transitions
 */
const calculatorReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_DIGIT':
      // Handle digit input
      if (state.overwrite) {
        return {
          ...state,
          currentValue: action.payload,
          overwrite: false
        };
      }
      
      // Prevent leading zeros
      if (state.currentValue === '0' && action.payload === '0') {
        return state;
      }
      
      // Handle decimal point
      if (action.payload === '.' && state.currentValue.includes('.')) {
        return state;
      }
      
      // Prevent multiple leading zeros
      if (state.currentValue === '0' && action.payload !== '.') {
        return {
          ...state,
          currentValue: action.payload
        };
      }
      
      return {
        ...state,
        currentValue: `${state.currentValue}${action.payload}`
      };
      
    case 'INPUT_OPERATOR':
      // If we have a pending operation, calculate it first
      if (state.operator && state.previousValue && !state.overwrite) {
        const result = calculate(
          parseFloat(state.previousValue),
          parseFloat(state.currentValue),
          state.operator
        );
        
        return {
          currentValue: result.toString(),
          previousValue: result.toString(),
          operator: action.payload,
          overwrite: true
        };
      }
      
      return {
        ...state,
        operator: action.payload,
        previousValue: state.currentValue,
        overwrite: true
      };
      
    case 'CLEAR':
      return {
        currentValue: '0',
        previousValue: null,
        operator: null,
        overwrite: false
      };
      
    case 'BACKSPACE':
      if (state.overwrite) {
        return {
          ...state,
          currentValue: '0',
          overwrite: false
        };
      }
      
      if (state.currentValue.length === 1) {
        return {
          ...state,
          currentValue: '0'
        };
      }
      
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1)
      };
      
    case 'PERCENTAGE':
      const current = parseFloat(state.currentValue);
      if (isNaN(current)) return state;
      
      return {
        ...state,
        currentValue: (current / 100).toString()
      };
      
    case 'CALCULATE':
      // Need both operands and operator to calculate
      if (!state.operator || !state.previousValue) {
        return state;
      }
      
      try {
        const result = calculate(
          parseFloat(state.previousValue),
          parseFloat(state.currentValue),
          state.operator
        );
        
        return {
          currentValue: result.toString(),
          previousValue: null,
          operator: null,
          overwrite: true
        };
      } catch (error) {
        return {
          currentValue: 'Error',
          previousValue: null,
          operator: null,
          overwrite: true
        };
      }
      
    case 'SIGN_TOGGLE':
      if (state.currentValue === '0') return state;
      
      return {
        ...state,
        currentValue: (parseFloat(state.currentValue) * -1).toString()
      };
      
    default:
      return state;
  }
};

/**
 * Main Calculator component
 * Uses useReducer for state management
 */
const Calculator = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    currentValue: '0',
    previousValue: null,
    operator: null,
    overwrite: false
  });
  
  // Handle button clicks
  const handleButtonClick = useCallback((action) => {
    if (isValidNumber(action)) {
      dispatch({ type: 'INPUT_DIGIT', payload: action });
      return;
    }
    
    switch (action) {
      case '+':
      case '-':
      case '*':
      case '/':
        dispatch({ type: 'INPUT_OPERATOR', payload: action });
        break;
      case '=':
        dispatch({ type: 'CALCULATE' });
        break;
      case 'clear':
        dispatch({ type: 'CLEAR' });
        break;
      case 'backspace':
        dispatch({ type: 'BACKSPACE' });
        break;
      case 'percentage':
        dispatch({ type: 'PERCENTAGE' });
        break;
      case '.':
        dispatch({ type: 'INPUT_DIGIT', payload: '.' });
        break;
      default:
        break;
    }
  }, []);
  
  // Build expression string for display
  const buildExpression = () => {
    if (!state.operator || !state.previousValue) {
      return '';
    }
    
    return `${state.previousValue} ${state.operator}`;
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xs sm:max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">React Calculator</h1>
        <div className="bg-gray-200 rounded-2xl shadow-lg p-4 sm:p-6">
          <Display 
            currentValue={state.currentValue} 
            expression={buildExpression()} 
          />
          <ButtonGrid onButtonClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;