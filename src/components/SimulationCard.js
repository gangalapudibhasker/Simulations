import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  display: block;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const Chapter = styled.span`
  display: inline-block;
  background: #f0f4ff;
  color: #667eea;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;

const SimulationCard = ({ classNum, simId, simulation }) => {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <CardLink to={`/class/${classNum}/${simId}`}>
        {simulation.chapter && <Chapter>{simulation.chapter}</Chapter>}
        <Title>{simulation.title}</Title>
        <Description>{simulation.description}</Description>
      </CardLink>
    </CardContainer>
  );
};

export default SimulationCard;
