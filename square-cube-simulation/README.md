# Square & Cube Numbers - Interactive Simulation

An attractive, colorful React application that helps users understand square numbers and cube numbers through interactive visualizations.

## Features

- **Square Numbers Simulation**: Visual representation of square numbers as perfect square grids
- **Cube Numbers Simulation**: 3D-like visualization of cube numbers as stacked square layers
- **Comparison View**: Side-by-side comparison of square and cube numbers
- **Interactive Controls**: Slider to adjust the base number and see real-time updates
- **Colorful Animations**: Smooth, animated transitions with vibrant colors
- **Educational Content**: Clear explanations and mathematical formulas

## Technologies Used

- React 18
- styled-components for styling
- framer-motion for animations
- Responsive design

## Installation

1. Navigate to the project directory:
```bash
cd square-cube-simulation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:3000`

## Usage

### Square Numbers Tab
- Use the slider to select a number (n)
- See the visual representation of n² as a grid of dots
- The grid forms a perfect square with n rows and n columns
- Read the explanation to understand the concept

### Cube Numbers Tab
- Use the slider to select a number (n)
- See the visual representation of n³ as stacked layers
- Each layer is a square grid with n × n dots
- There are n such layers stacked together
- Read the explanation to understand the concept

### Comparison View Tab
- Compare square and cube numbers side by side
- See both visualizations simultaneously
- Understand the key differences between squares and cubes
- Notice how cube numbers grow much faster than square numbers

## Mathematical Concepts

### Square Numbers
- **Definition**: A square number is the product of an integer multiplied by itself
- **Formula**: n² = n × n
- **Examples**: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...
- **Visualization**: Perfect square grid

### Cube Numbers
- **Definition**: A cube number is the product of an integer multiplied by itself twice (three times in total)
- **Formula**: n³ = n × n × n
- **Examples**: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000...
- **Visualization**: Stacked square layers forming a cube

## Project Structure

```
square-cube-simulation/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── index.js
│   ├── App.js
│   └── components/
│       ├── SquareSimulation.js
│       ├── CubeSimulation.js
│       └── ComparisonView.js
├── package.json
├── .gitignore
└── README.md
```

## Customization

You can customize:
- Colors by modifying the color arrays in the components
- Animation speeds by adjusting the transition durations
- Maximum values by changing the slider max values
- Styling by modifying the styled-components

## Browser Support

The application works on modern browsers including:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available for educational use.

## Contributing

Feel free to fork this repository and submit pull requests with improvements or additional features.

---

**Created for educational purposes to help visualize mathematical concepts in an interactive and engaging way.**
