import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardContainer = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
    transform: translateY(-4px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const ClassNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const ClassName = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.95rem;
`;

const SimCount = styled.span`
  display: inline-block;
  background: #f0f4ff;
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const ClassCard = ({ classNum, classInfo, simulationCount }) => {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <CardLink to={`/class/${classNum}`}>
        <ClassNumber>Class {classNum}</ClassNumber>
        <ClassName>{classInfo.name}</ClassName>
        <Description>{classInfo.description}</Description>
        <SimCount>{simulationCount} simulation{simulationCount !== 1 ? 's' : ''}</SimCount>
      </CardLink>
    </CardContainer>
  );
};

export default ClassCard;
