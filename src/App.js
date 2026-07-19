import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import SimulationView from './pages/SimulationView';
import Navigation from './components/Navigation';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class/:classNum" element={<ClassPage />} />
          <Route path="/class/:classNum/:simId" element={<SimulationView />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
