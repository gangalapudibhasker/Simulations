import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SquareSimulation from './components/SquareSimulation';
import CubeSimulation from './components/CubeSimulation';
import ComparisonView from './components/ComparisonView';

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  padding: 30px 0;
  color: white;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-top: 10px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;
`;

const NavButton = styled(motion.button)`
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;
  background: ${props => props.active ? 
    'linear-gradient(45deg, #ff6b6b, #feca57)' : 
    'rgba(255,255,255,0.2)'};
  box-shadow: ${props => props.active ? 
    '0 4px 15px rgba(255,107,107,0.4)' : 
    '0 4px 15px rgba(0,0,0,0.2)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const MainContent = styled.main`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin: 20px 0;
  min-height: 600px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const App = () => {
  const [activeTab, setActiveTab] = useState('square');

  const tabs = [
    { id: 'square', label: 'Square Numbers' },
    { id: 'cube', label: 'Cube Numbers' },
    { id: 'comparison', label: 'Compare Both' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'square':
        return <SquareSimulation />;
      case 'cube':
        return <CubeSimulation />;
      case 'comparison':
        return <ComparisonView />;
      default:
        return <SquareSimulation />;
    }
  };

  return (
    <AppContainer>
      <Header>
        <h1>Square & Cube Numbers</h1>
        <p className="subtitle">Interactive Visual Learning Experience</p>
      </Header>

      <Navigation>
        {tabs.map(tab => (
          <NavButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {tab.label}
          </NavButton>
        ))}
      </Navigation>

      <AnimatePresence mode="wait">
        <MainContent
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </MainContent>
      </AnimatePresence>

      <Footer>
        <p>Mathematical Visualization Tool | Learn through Interactive Simulations</p>
      </Footer>
    </AppContainer>
  );
};

export default App;
