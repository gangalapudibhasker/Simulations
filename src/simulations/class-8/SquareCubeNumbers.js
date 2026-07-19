import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  padding: 30px 0;
  color: #333;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const NavButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: ${props => props.active ? '#667eea' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 12px;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  gap: 30px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VisualizationArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 30px;
  min-height: 300px;
`;

const ControlArea = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
`;

const SliderContainer = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
  }

  input[type='range'] {
    width: 100%;
  }
`;

const ValueDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  margin: 10px 0;
`;

const ExplanationBox = styled.div`
  background: #f0f4ff;
  border-left: 4px solid #667eea;
  padding: 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
`;

const Dot = styled(motion.div)`
  width: 25px;
  height: 25px;
  background: ${props => props.color};
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SquareCubeNumbers = () => {
  const [activeTab, setActiveTab] = useState('square');
  const [value, setValue] = useState(5);

  const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#a29bfe', '#fd79a8', '#55efc4', '#fdcb6e'];
  const getColor = (index) => colors[index % colors.length];

  const renderSquareVisualization = () => {
    const dots = [];
    for (let i = 0; i < value * value; i++) {
      dots.push(
        <Dot
          key={i}
          color={getColor(i)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: i * 0.01 }}
        />
      );
    }
    return dots;
  };

  return (
    <Container>
      <Header>
        <h1>Square & Cube Numbers</h1>
        <p className="subtitle">Interactive Visual Learning</p>
      </Header>

      <Navigation>
        <NavButton
          active={activeTab === 'square'}
          onClick={() => setActiveTab('square')}
        >
          Squares
        </NavButton>
        <NavButton
          active={activeTab === 'cube'}
          onClick={() => setActiveTab('cube')}
        >
          Cubes
        </NavButton>
      </Navigation>

      <MainContent>
        <AnimatePresence mode="wait">
          {activeTab === 'square' && (
            <ContentWrapper
              key="square"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VisualizationArea>
                <Grid>
                  {renderSquareVisualization()}
                </Grid>
              </VisualizationArea>
              <ControlArea>
                <h2>Square Numbers (n²)</h2>
                <SliderContainer>
                  <label>Select a number (n)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => setValue(parseInt(e.target.value))}
                  />
                  <ValueDisplay>{value}² = {value * value}</ValueDisplay>
                </SliderContainer>
                <ExplanationBox>
                  <strong>What is a square number?</strong>
                  <p>A square number is the product of a number multiplied by itself.</p>
                  <p><strong>Formula:</strong> n² = n × n</p>
                  <p><strong>Examples:</strong> 1, 4, 9, 16, 25, 36, 49, 64, 81, 100</p>
                </ExplanationBox>
              </ControlArea>
            </ContentWrapper>
          )}

          {activeTab === 'cube' && (
            <ContentWrapper
              key="cube"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <VisualizationArea>
                <Grid style={{ maxWidth: '300px' }}>
                  {renderSquareVisualization()}
                </Grid>
              </VisualizationArea>
              <ControlArea>
                <h2>Cube Numbers (n³)</h2>
                <SliderContainer>
                  <label>Select a number (n)</label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={value}
                    onChange={(e) => setValue(parseInt(e.target.value))}
                  />
                  <ValueDisplay>{value}³ = {value * value * value}</ValueDisplay>
                </SliderContainer>
                <ExplanationBox>
                  <strong>What is a cube number?</strong>
                  <p>A cube number is the product of a number multiplied by itself three times.</p>
                  <p><strong>Formula:</strong> n³ = n × n × n</p>
                  <p><strong>Examples:</strong> 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000</p>
                </ExplanationBox>
              </ControlArea>
            </ContentWrapper>
          )}
        </AnimatePresence>
      </MainContent>
    </Container>
  );
};

export default SquareCubeNumbers;
