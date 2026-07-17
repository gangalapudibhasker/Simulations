import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import TheorySection from './components/TheorySection';
import PracticeSection from './components/PracticeSection';
import QuizSection from './components/QuizSection';

const App = () => {
  const [activeSection, setActiveSection] = useState('theory');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    { id: 'theory', label: 'Theory', icon: '📚' },
    { id: 'visualizer', label: 'Visualizer', icon: '🎯' },
    { id: 'practice', label: 'Practice', icon: '💡' },
    { id: 'quiz', label: 'Quiz', icon: '📝' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'visualizer':
        return <AlgorithmVisualizer />;
      case 'practice':
        return <PracticeSection />;
      case 'quiz':
        return <QuizSection />;
      default:
        return <TheorySection />;
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>
          <span className="highlight">Real Numbers</span>
          <Subtitle>CBSE 10th Class Mathematics</Subtitle>
        </Title>
        <Navigation>
          {sections.map((section) => (
            <NavItem
              key={section.id}
              active={activeSection === section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="icon">{section.icon}</span>
              {!isMobile && <span className="label">{section.label}</span>}
            </NavItem>
          ))}
        </Navigation>
      </Header>
      
      <MainContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </MainContent>

      <Footer>
        <p>Euclid's Division Algorithm & Fundamental Theorem of Arithmetic</p>
        <p className="credit">Created for CBSE Class 10 Mathematics</p>
      </Footer>
    </AppContainer>
  );
};

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: 'Inter', sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow};
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;

  .highlight {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${pulse} 2s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .highlight {
      font-size: 1.5rem;
    }
  }
`;

const Subtitle = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0.25rem;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const NavItem = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: ${({ active, theme }) => active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  .icon {
    font-size: 1.25rem;
  }

  .label {
    font-size: 0.875rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    .label {
      display: none;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Footer = styled.footer`
  background: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;

  .credit {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }
`;

export default App;
