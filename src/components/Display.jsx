import React from 'react';
import PropTypes from 'prop-types';
import { formatDisplay } from '../utils/calculate';

/**
 * Display component for calculator
 * Shows the current value and expression
 */
const Display = ({ currentValue, expression }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 text-right w-full">
      {/* Expression display */}
      <div className="text-gray-400 text-sm min-h-[20px] mb-1 overflow-x-auto whitespace-nowrap">
        {expression}
      </div>
      
      {/* Main value display */}
      <div 
        className="text-white text-3xl sm:text-4xl font-bold overflow-x-auto whitespace-nowrap"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatDisplay(currentValue)}
      </div>
    </div>
  );
};

Display.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  expression: PropTypes.string
};

Display.defaultProps = {
  currentValue: '0',
  expression: ''
};

export default Display;