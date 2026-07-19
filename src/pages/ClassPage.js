import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SimulationCard from '../components/SimulationCard';
import { SIMULATIONS_REGISTRY } from '../data/simulationsRegistry';

const PageContainer = styled.div`
  padding: 2rem 2rem 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-block;
  color: white;
  text-decoration: none;
  margin-bottom: 2rem;
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
  margin-bottom: 3rem;
  text-align: center;
`;

const ClassTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  opacity: 0.95;
  margin-bottom: 0.5rem;
`;

const Curriculum = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.95rem;
  margin-top: 1rem;
`;

const SimulationsSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SimulationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  border: 1px dashed rgba(255, 255, 255, 0.3);

  p {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const ClassPage = () => {
  const { classNum } = useParams();
  const classData = SIMULATIONS_REGISTRY[classNum];

  if (!classData) {
    return (
      <PageContainer>
        <BackButton to="/">← Back to Home</BackButton>
        <EmptyState>
          <p>❌ Class {classNum} not found</p>
        </EmptyState>
      </PageContainer>
    );
  }

  const { classInfo, simulations } = classData;

  return (
    <PageContainer>
      <BackButton to="/">← Back to Home</BackButton>
      
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ClassTitle>{classInfo.name}</ClassTitle>
        <Description>{classInfo.description}</Description>
        <Curriculum>{classInfo.curriculum}</Curriculum>
      </Header>

      <SimulationsSection>
        <SectionTitle>📚 Available Simulations</SectionTitle>
        {simulations.length > 0 ? (
          <SimulationsGrid>
            {simulations.map((sim, index) => (
              <SimulationCard
                key={sim.id}
                classNum={classNum}
                simId={sim.id}
                simulation={sim}
              />
            ))}
          </SimulationsGrid>
        ) : (
          <EmptyState>
            <p>No simulations available for this class yet.</p>
          </EmptyState>
        )}
      </SimulationsSection>
    </PageContainer>
  );
};

export default ClassPage;
