# React Calculator

A production-quality calculator built with React following best practices.

## Features

- Functional components with hooks
- useReducer for state management
- Pure utility functions for calculations
- Responsive design with Tailwind CSS
- Keyboard and mouse support
- Error handling for edge cases
- Clean, well-documented code

## Architecture

- `Calculator.jsx` - Root component with state management
- `Display.jsx` - Shows current value and expression
- `Button.jsx` - Reusable button component
- `ButtonGrid.jsx` - Grid layout for calculator buttons
- `utils/calculate.js` - Pure functions for mathematical operations

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Open browser to http://localhost:3000

## Technical Decisions

- **useReducer over useState**: Chosen for complex state logic and better predictability
- **Pure utility functions**: Calculation logic separated for testability
- **Functional components**: Modern React approach
- **No external UI libraries**: Custom implementation for full control
- **Keyboard support**: Accessibility compliance
- **Error handling**: Graceful handling of edge cases like division by zero

## Edge Cases Handled

- Division by zero
- Overflow values
- NaN results
- Large number formatting
- Decimal precision

Built with React and Vite for fast development.
