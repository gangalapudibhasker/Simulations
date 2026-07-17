import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SimulationContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ControlPanel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 25px;
  width: 300px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  h2 {
    color: white;
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-align: center;
  }
`;

const SliderContainer = styled.div`
  margin: 20px 0;

  label {
    display: block;
    color: white;
    margin-bottom: 10px;
    font-weight: 600;
    text-align: center;
  }

  input[type="range"] {
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    outline: none;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: linear-gradient(45deg, #ff6b6b, #feca57);
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: linear-gradient(45deg, #ff6b6b, #feca57);
      cursor: pointer;
      border: none;
    }
  }

  .value-display {
    text-align: center;
    margin-top: 10px;
    font-size: 1.2rem;
    color: #ff6b6b;
    font-weight: 700;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, #48dbfb, #0abde3);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 10px 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(72, 219, 251, 0.4);
  }
`;

const VisualizationArea = styled.div`
  flex: 1;
  min-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  h2 {
    color: white;
    margin-bottom: 20px;
    font-size: 1.5rem;
    text-align: center;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

const Dot = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    z-index: 10;
  }
`;

const InfoPanel = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  color: white;

  h3 {
    margin-bottom: 10px;
    color: #ff6b6b;
  }

  p {
    margin: 5px 0;
    line-height: 1.6;
  }
`;

const Equation = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 1.5rem;
  color: white;

  span {
    background: linear-gradient(45deg, #ff6b6b, #feca57);
    padding: 5px 15px;
    border-radius: 8px;
    margin: 0 5px;
  }
`;

const SquareSimulation = () => {
  const [number, setNumber] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);

  const colors = [
    'linear-gradient(45deg, #ff6b6b, #feca57)',
    'linear-gradient(45deg, #48dbfb, #0abde3)',
    'linear-gradient(45deg, #feca57, #ff9ff3)',
    'linear-gradient(45deg, #ff9ff3, #54a0ff)',
    'linear-gradient(45deg, #5f27cd, #00d2ff)',
    'linear-gradient(45deg, #1dd1a1, #feca57)',
    'linear-gradient(45deg, #ff6348, #ff9ff3)',
    'linear-gradient(45deg, #2ed573, #533483)',
  ];

  const square = number * number;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [number]);

  const handleNumberChange = (e) => {
    setNumber(parseInt(e.target.value));
  };

  const generateGrid = () => {
    const grid = [];
    for (let i = 0; i < number; i++) {
      for (let j = 0; j < number; j++) {
        const index = i * number + j;
        grid.push(
          <Dot
            key={`${i}-${j}`}
            style={{
              background: colors[index % colors.length]
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: isAnimating ? index * 0.05 : 0,
              type: 'spring',
              stiffness: 100
            }}
            whileHover={{ scale: 1.1 }}
          >
            {index + 1}
          </Dot>
        );
      }
    }
    return grid;
  };

  return (
    <SimulationContainer>
      <ControlPanel>
        <h2>Square Numbers</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>
          A square number is the result of multiplying a number by itself.
        </p>
        
        <SliderContainer>
          <label>Base Number (n): {number}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={number}
            onChange={handleNumberChange}
          />
          <div className="value-display">n = {number}</div>
        </SliderContainer>

        <Equation>
          n<span>²</span> = {number}<span>²</span> = <span>{square}</span>
        </Equation>

        <Button
          onClick={() => setShowExplanation(!showExplanation)}
          whileTap={{ scale: 0.95 }}
        >
          {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
        </Button>

        <Button
          onClick={() => setNumber(Math.floor(Math.random() * 10) + 1)}
          whileTap={{ scale: 0.95 }}
        >
          Random Number
        </Button>
      </ControlPanel>

      <VisualizationArea>
        <h2>Visualization: {number} × {number} = {square}</h2>
        
        <GridContainer
          style={{
            gridTemplateColumns: `repeat(${number}, 40px)`,
            justifyContent: 'center'
          }}
        >
          <AnimatePresence mode="wait">
            {generateGrid()}
          </AnimatePresence>
        </GridContainer>

        <InfoPanel>
          <h3>What are Square Numbers?</h3>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p><strong>Definition:</strong> A square number is the product of an integer multiplied by itself.</p>
              <p><strong>Formula:</strong> n² = n × n</p>
              <p><strong>Examples:</strong> 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...</p>
              <p><strong>Visualization:</strong> The dots above form a perfect square grid with {number} rows and {number} columns.</p>
              <p><strong>Total dots:</strong> {square} (which is {number} squared)</p>
            </motion.div>
          )}
        </InfoPanel>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: 'white',
          fontSize: '1.1rem'
        }}>
          <p>Try changing the slider to see different square numbers!</p>
          <p>Notice how the grid always forms a perfect square shape.</p>
        </div>
      </VisualizationArea>
    </SimulationContainer>
  );
};

export default SquareSimulation;
