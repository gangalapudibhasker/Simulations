# Classwise Simulations Portal - Project Structure

## Overview
Unified React application organizing interactive mathematics simulations by class (6-10).

## Directory Structure

```
src/
├── App.js                          Main app with routing
├── index.js                        Entry point
├── index.css                       Global styles
├── data/
│   └── simulationsRegistry.js      Central registry of all simulations
├── pages/
│   ├── HomePage.js                 Home with class cards grid
│   ├── ClassPage.js                Class detail page
│   └── SimulationView.js           Individual simulation viewer
├── components/
│   ├── Navigation.js               Top navigation
│   ├── ClassCard.js                Class card component
│   └── SimulationCard.js           Simulation card component
├── simulations/
│   ├── class-6/                    Class 6 simulations
│   ├── class-7/                    Class 7 simulations
│   ├── class-8/
│   │   └── SquareCubeNumbers.js
│   ├── class-9/
│   │   └── QuadraticExplorer.js
│   └── class-10/
│       └── RealNumbers.js
└── public/
    └── index.html
```

## Routing

- `/` - Home page with class cards
- `/class/:classNum` - Class detail page
- `/class/:classNum/:simId` - Individual simulation

## Adding New Simulations

### 1. Create component
`src/simulations/class-X/SimulationName.js`

### 2. Register in simulationsRegistry.js
Add entry with id, title, description, chapter, and component name

### 3. Add to SimulationView.js imports and SIMULATION_COMPONENTS map

### 4. Component appears automatically on class page!

## Tech Stack
- React 18
- React Router v6
- styled-components
- Framer Motion
- Create React App

## Running

```bash
cd src
npm install
npm start
```
