import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ComparisonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const ControlPanel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 25px;
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;

  label {
    color: white;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 1.1rem;
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
      background: linear-gradient(45deg, #ff6b6b, #48dbfb);
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    &::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: linear-gradient(45deg, #ff6b6b, #48dbfb);
      cursor: pointer;
      border: none;
    }
  }

  .value-display {
    text-align: center;
    margin-top: 10px;
    font-size: 1.3rem;
    color: #ff6b6b;
    font-weight: 700;
  }
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  width: 100%;
  margin: 20px 0;
`;

const ComparisonCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;

  h3 {
    color: white;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }
`;

const VisualizationContainer = styled.div`
  margin: 20px 0;
  min-height: 300px;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 8px;
  justify-content: center;
  margin: 20px 0;
`;

const Dot = styled(motion.div)`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.7rem;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const Layer = styled(motion.div)`
  display: grid;
  gap: 8px;
  margin: 8px 0;
  justify-content: center;
`;

const CubeDot = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.6rem;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const Equation = styled.div`
  text-align: center;
  margin: 15px 0;
  font-size: 1.2rem;
  color: white;

  span {
    background: linear-gradient(45deg, #ff6b6b, #48dbfb);
    padding: 3px 10px;
    border-radius: 6px;
    margin: 0 3px;
  }
`;

const InfoText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 10px 0;
`;

const Highlight = styled.span`
  color: #ff6b6b;
  font-weight: 700;
`;

const Button = styled(motion.button)`
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(45deg, #ff6b6b, #48dbfb);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  }
`;

const ComparisonView = () => {
  const [number, setNumber] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);

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
  const cube = number * number * number;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [number]);

  const handleNumberChange = (e) => {
    setNumber(parseInt(e.target.value));
  };

  const generateSquareGrid = () => {
    const grid = [];
    for (let i = 0; i < number; i++) {
      for (let j = 0; j < number; j++) {
        const index = i * number + j;
        grid.push(
          <Dot
            key={`sq-${i}-${j}`}
            style={{
              background: colors[index % colors.length]
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: isAnimating ? index * 0.04 : 0,
              type: 'spring',
              stiffness: 100
            }}
          >
            {index + 1}
          </Dot>
        );
      }
    }
    return grid;
  };

  const generateCubeLayers = () => {
    const layers = [];
    let dotIndex = 0;
    
    for (let layer = 0; layer < number; layer++) {
      const dots = [];
      for (let row = 0; row < number; row++) {
        for (let col = 0; col < number; col++) {
          const index = dotIndex++;
          dots.push(
            <CubeDot
              key={`cb-${layer}-${row}-${col}`}
              style={{
                background: colors[index % colors.length]
              }}
              initial={{ opacity: 0, scale: 0.5, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: isAnimating ? index * 0.02 : 0,
                type: 'spring',
                stiffness: 100
              }}
            >
              {index + 1}
            </CubeDot>
          );
        }
      }
      
      layers.push(
        <Layer
          key={`layer-${layer}`}
          style={{
            gridTemplateColumns: `repeat(${number}, 20px)`
          }}
        >
          {dots}
        </Layer>
      );
    }
    
    return layers;
  };

  return (
    <ComparisonContainer>
      <Title>Compare Square and Cube Numbers</Title>
      
      <ControlPanel>
        <SliderContainer>
          <label>Number (n): {number}</label>
          <input
            type="range"
            min="1"
            max="6"
            value={number}
            onChange={handleNumberChange}
          />
          <div className="value-display">n = {number}</div>
        </SliderContainer>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          color: 'white'
        }}>
          <Equation>
            n<span>²</span> = {number}<span>²</span> = <span>{square}</span>
          </Equation>
          <Equation>
            n<span>³</span> = {number}<span>³</span> = <span>{cube}</span>
          </Equation>
          <Button
            onClick={() => setNumber(Math.floor(Math.random() * 6) + 1)}
            whileTap={{ scale: 0.95 }}
          >
            Random Number
          </Button>
        </div>
      </ControlPanel>

      <ComparisonGrid>
        <ComparisonCard>
          <h3>Square Number (n²)</h3>
          <Equation>
            {number} × {number} = <span>{square}</span>
          </Equation>
          <VisualizationContainer>
            <GridContainer
              style={{
                gridTemplateColumns: `repeat(${number}, 25px)`,
                justifyContent: 'center'
              }}
            >
              <AnimatePresence mode="wait">
                {generateSquareGrid()}
              </AnimatePresence>
            </GridContainer>
          </VisualizationContainer>
          <InfoText>
            A square number creates a <Highlight>perfect square grid</Highlight>.
            Here we have {number} rows and {number} columns, totaling {square} dots.
          </InfoText>
        </ComparisonCard>

        <ComparisonCard>
          <h3>Cube Number (n³)</h3>
          <Equation>
            {number} × {number} × {number} = <span>{cube}</span>
          </Equation>
          <VisualizationContainer>
            {generateCubeLayers()}
          </VisualizationContainer>
          <InfoText>
            A cube number creates <Highlight>stacked square layers</Highlight>.
            Each layer has {number} × {number} = {square} dots, and there are {number} layers,
            totaling {cube} dots.
          </InfoText>
        </ComparisonCard>
      </ComparisonGrid>

      <div style={{ 
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '15px',
        padding: '25px',
        width: '100%',
        maxWidth: '800px',
        color: 'white',
        marginTop: '20px'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#ff6b6b' }}>Key Differences:</h3>
        <ul style={{ 
          textAlign: 'left', 
          lineHeight: '1.8',
          fontSize: '1.05rem'
        }}>
          <li><strong>Square:</strong> Two-dimensional (area of a square)</li>
          <li><strong>Cube:</strong> Three-dimensional (volume of a cube)</li>
          <li><strong>Growth:</strong> Cube numbers grow much faster than square numbers</li>
          <li><strong>Formula:</strong> n² vs n³</li>
          <li><strong>Visual:</strong> Flat grid vs stacked layers</li>
        </ul>
        <div style={{ 
          marginTop: '20px', 
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
            Notice: {cube} (cube) is {Math.round((cube / square) * 100) / 100} times larger than {square} (square)
          </p>
        </div>
      </div>
    </ComparisonContainer>
  );
};

export default ComparisonView;
