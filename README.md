

## Calculator Project 

A minimalistic, accessible web-based calculator application featuring standard arithmetic operations and a special "Aidar Mode" for demonstration purposes.

**Live Demo:** [https://aizhigitz.github.io/calculator-project]
![Изображение WhatsApp 2025-11-14 в 10 01 54_a89d8372](https://github.com/user-attachments/assets/3e96f9fe-3a4b-469b-9657-f93fab3ed7e1)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Specifications](#technical-specifications)
- [File Structure](#file-structure)
- [Setup and Deployment](#setup-and-deployment)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This calculator application implements core arithmetic functionality with full keyboard support and accessibility features. The project demonstrates modern ES6 JavaScript patterns, responsive design principles, and collaborative development practices.

**Key Characteristics:**
- Performs calculations on integers and decimal numbers
- Supports four basic operations: addition, subtraction, multiplication, division
- Includes error handling for edge cases (e.g., division by zero)
- Maintains calculation history of last 10 operations
- Fully accessible with keyboard navigation and screen reader support

---

## Features

### Calculator Mode

The calculator implements standard arithmetic functionality:

- **Basic Operations:** Addition (+), subtraction (−), multiplication (×), division (÷)
- **Decimal Support:** Full support for floating-point numbers
- **Left-to-Right Evaluation:** Calculations processed sequentially (e.g., 12 + 3 × 2 = 30)
- **Clear Functions:**
  - **C:** Clears current entry while preserving operation state
  - **AC:** Resets calculator to initial state
- **Backspace:** Removes last entered digit
- **Error Handling:** Gracefully handles division by zero with informative message
- **Calculation History:** Displays last 10 operations in chronological order

### Aidar Mode

A special demonstration mode where:

- All calculations are performed correctly in the background
- Results display as "Hello World" regardless of the calculation
- Calculation history records "Hello World" as the result
- Accessible via toggle button in the interface

### Keyboard Support

| Key(s) | Action |
|--------|--------|
| 0–9 | Number input |
| + − × ÷ | Operators |
| . | Decimal point |
| Enter or = | Calculate result |
| Backspace | Delete last digit |
| Escape | All Clear (AC) |
| C | Clear current entry |

---

## Technical Specifications

### ES6 Features Implemented

The application utilizes modern JavaScript features:

1. **Arrow Functions:** Concise function definitions used throughout the codebase
2. **Template Literals:** String interpolation for dynamic content generation
3. **Destructuring:** Property extraction from objects for cleaner code
4. **Array Methods:** Utilizes `map()`, `forEach()`, `slice()`, `unshift()`
5. **Default Parameters:** Function definitions with default argument values
6. **Block-Scoped Variables:** `const` and `let` instead of `var`

### Accessibility Compliance

The calculator meets WCAG accessibility standards:

- Semantic HTML structure (`<header>`, `<main>`, `<aside>`)
- `aria-live="polite"` region for dynamic display updates
- Descriptive `aria-label` attributes on all buttons
- `aria-pressed` state for mode toggle button
- Proper ARIA roles: `role="grid"` for button layout, `role="log"` for history panel
- Full keyboard navigation support
- Visible focus indicators (2px outline)
- Logical tab order for efficient navigation

### Calculator Object Architecture

The calculator logic is encapsulated in a factory function with the following structure:

**Properties:**
- `current`: Current display value
- `operand`: Stored operand for binary operations
- `operator`: Current operator (+, −, ×, ÷)
- `history`: Array of last 10 calculations
- `waitingForOperand`: State flag for operation sequencing

**Methods:**
- `inputDigit(digit)`: Process numeric input
- `inputDecimal()`: Handle decimal point entry
- `chooseOperator(operator)`: Set operation and evaluate previous operation
- `evaluate(isAidarMode)`: Perform calculation and update state
- `clear()`: Clear current entry
- `allClear()`: Reset calculator state
- `backspace()`: Remove last digit
- `toJSON()`: Serialize calculator state

---

## File Structure

```
calculator-project/
├── index.html          # HTML structure with semantic markup
├── styles.css          # CSS styling and responsive layout
├── calculator.js       # Calculator logic and state management
├── app.js             # UI interactions and event handling
├── README.md          # Project documentation

```

---

## Setup and Deployment

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/AizhigitZ/calculator-project.git
   cd calculator-project
   ```

2. Open `index.html` in your browser or run a local development server:
   

### GitHub Pages Deployment

1. Push all files to your repository
2. Navigate to **Settings** → **Pages**
3. Under "Source", select the `main` branch
4. Click **Save**
5. Your application will be available at: `https://yourusername.github.io/calculator-calculator/`

---

## Browser Support

This application has been tested and verified to function correctly on:

- Chrome/Edge (latest versions)
- Firefox (latest version)
- Safari (latest version)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Design Philosophy

The calculator employs a clean, minimalistic design philosophy:

- **Visual Identity:** Yurt icon SVG representing Kyrgyz nomadic heritage
- **Color Palette:**
  - Primary: Gray/White (professional, clean aesthetic)
  - Accent: Brown (#8B4513) - traditional felt and earth tones
  - Secondary: Gold (#D4AF37) - traditional ornamental accents
- **Typography:** System fonts for optimal accessibility and rendering
- **Interactions:** Subtle hover effects without visual distractions
- **Responsiveness:** Mobile-friendly grid layout

---

## Contributing

To contribute to this project:

1. Create an issue describing the feature or bug
2. Create a feature branch: `git checkout -b feature/description`
3. Commit your changes: `git commit -m 'Descriptive commit message'`
4. Push to the branch: `git push origin feature/description`
5. Open a Pull Request for peer review

---

## License

This project is open source and available for use and modification.

---

## Acknowledgments

- Developed as a collaborative learning project demonstrating pair programming practices and modern JavaScript standards
- Special recognition to "Aidar Mode" - a reminder that sometimes simplicity is elegant
