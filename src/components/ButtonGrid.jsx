import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * ButtonGrid component for calculator
 * Organizes buttons in a grid layout
 */
const ButtonGrid = ({ onButtonClick }) => {
  // Define button layout
  const buttons = [
    [
      { label: 'AC', action: 'clear', variant: 'clear' },
      { label: 'C', action: 'backspace', variant: 'clear' },
      { label: '%', action: 'percentage', variant: 'operator' },
      { label: '÷', action: '/', variant: 'operator' }
    ],
    [
      { label: '7', action: '7', variant: 'number' },
      { label: '8', action: '8', variant: 'number' },
      { label: '9', action: '9', variant: 'number' },
      { label: '×', action: '*', variant: 'operator' }
    ],
    [
      { label: '4', action: '4', variant: 'number' },
      { label: '5', action: '5', variant: 'number' },
      { label: '6', action: '6', variant: 'number' },
      { label: '-', action: '-', variant: 'operator' }
    ],
    [
      { label: '1', action: '1', variant: 'number' },
      { label: '2', action: '2', variant: 'number' },
      { label: '3', action: '3', variant: 'number' },
      { label: '+', action: '+', variant: 'operator' }
    ],
    [
      { label: '0', action: '0', variant: 'number', wide: true },
      { label: '.', action: '.', variant: 'number' },
      { label: '=', action: '=', variant: 'equals' }
    ]
  ];

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {buttons.flat().map((button, index) => (
        <Button
          key={index}
          onClick={() => onButtonClick(button.action)}
          variant={button.variant}
          className={button.wide ? 'col-span-2' : ''}
          ariaLabel={`Button ${button.label}`}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

ButtonGrid.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default ButtonGrid;