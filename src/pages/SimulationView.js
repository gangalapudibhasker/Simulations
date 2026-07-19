import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SIMULATIONS_REGISTRY, getSimulation } from '../data/simulationsRegistry';
import RealNumbers from '../simulations/class-10/RealNumbers';
import SquareCubeNumbers from '../simulations/class-8/SquareCubeNumbers';
import QuadraticExplorer from '../simulations/class-9/QuadraticExplorer';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 2rem 4rem 2rem;
`;

const BackButton = styled(Link)`
  display: inline-block;
  color: white;
  text-decoration: none;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Header = styled(motion.div)`
  color: white;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.05rem;
  opacity: 0.95;
  margin: 0;
`;

const SimulationContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingState = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  color: #667eea;
  font-size: 1.1rem;
`;

const ErrorState = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  background: white;
  border-radius: 12px;
  color: #ff6b6b;
  font-size: 1.1rem;
`;

const SIMULATION_COMPONENTS = {
  RealNumbers,
  SquareCubeNumbers,
  QuadraticExplorer
};

const SimulationView = () => {
  const { classNum, simId } = useParams();
  const simulation = getSimulation(classNum, simId);

  if (!simulation) {
    return (
      <PageContainer>
        <BackButton to={`/class/${classNum}`}>← Back to Class {classNum}</BackButton>
        <ErrorState>❌ Simulation not found</ErrorState>
      </PageContainer>
    );
  }

  const Component = SIMULATION_COMPONENTS[simulation.component];

  if (!Component) {
    return (
      <PageContainer>
        <BackButton to={`/class/${classNum}`}>← Back to Class {classNum}</BackButton>
        <ErrorState>⚠️ Component "{simulation.component}" is not implemented yet</ErrorState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <BackButton to={`/class/${classNum}`}>← Back to Class {classNum}</BackButton>
      
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>{simulation.title}</Title>
        <Description>{simulation.description}</Description>
        {simulation.chapter && <Description style={{ marginTop: '0.5rem' }}>📖 {simulation.chapter}</Description>}
      </Header>

      <SimulationContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Suspense fallback={<LoadingState>Loading simulation...</LoadingState>}>
          <Component />
        </Suspense>
      </SimulationContainer>
    </PageContainer>
  );
};

export default SimulationView;
