import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component for calculator
 * Handles both mouse clicks and keyboard events
 */
const Button = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'default',
  ariaLabel,
  ...props 
}) => {
  // Define button styles based on variant
  const baseClasses = 'flex items-center justify-center rounded-md text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 focus:ring-gray-500',
    operator: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white focus:ring-orange-500',
    equals: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white focus:ring-orange-500',
    clear: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-500',
    number: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 focus:ring-gray-500'
  };
  
  const sizeClasses = 'h-16 text-xl sm:h-20 sm:text-2xl';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className}`;
  
  // Handle keyboard events
  const handleKeyDown = (e) => {
    // Activate button on Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel || typeof children === 'string' ? children : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'operator', 'equals', 'clear', 'number']),
  ariaLabel: PropTypes.string
};

export default Button;