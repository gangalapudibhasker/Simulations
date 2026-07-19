import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ClassCard from '../components/ClassCard';
import { SIMULATIONS_REGISTRY } from '../data/simulationsRegistry';

const PageContainer = styled.div`
  padding: 2rem 2rem 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Hero = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatsContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  text-align: center;
  margin-top: 4rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    opacity: 0.9;
    font-size: 0.95rem;
  }
`;

const HomePage = () => {
  const classes = Object.keys(SIMULATIONS_REGISTRY).map(classNum => parseInt(classNum)).sort((a, b) => a - b);
  const totalSimulations = Object.values(SIMULATIONS_REGISTRY).reduce(
    (acc, classData) => acc + classData.simulations.length,
    0
  );

  return (
    <PageContainer>
      <Hero
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>🧮 Interactive Math Simulations</Title>
        <Subtitle>
          Explore mathematical concepts through interactive visualizations for Classes 6-10
        </Subtitle>
      </Hero>

      <Grid>
        {classes.map(classNum => {
          const classData = SIMULATIONS_REGISTRY[classNum];
          return (
            <ClassCard
              key={classNum}
              classNum={classNum}
              classInfo={classData.classInfo}
              simulationCount={classData.simulations.length}
            />
          );
        })}
      </Grid>

      <StatsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2>Platform Overview</h2>
        <StatsGrid>
          <StatItem>
            <h3>{classes.length}</h3>
            <p>Classes</p>
          </StatItem>
          <StatItem>
            <h3>{totalSimulations}</h3>
            <p>Simulations</p>
          </StatItem>
          <StatItem>
            <h3>CBSE</h3>
            <p>Aligned</p>
          </StatItem>
          <StatItem>
            <h3>100%</h3>
            <p>Interactive</p>
          </StatItem>
        </StatsGrid>
      </StatsContainer>
    </PageContainer>
  );
};

export default HomePage;
