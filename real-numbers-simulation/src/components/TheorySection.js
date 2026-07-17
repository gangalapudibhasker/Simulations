import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TheorySection = () => {
  const [activeTopic, setActiveTopic] = useState('euclid');

  const topics = [
    {
      id: 'euclid',
      title: 'Euclid\'s Division Algorithm',
      content: {
        definition: 'Given two positive integers a and b, there exist unique integers q and r such that:',
        formula: 'a = b × q + r, where 0 ≤ r < b',
        explanation: [
          'This algorithm is based on the principle that any integer can be divided by another integer to give a quotient and a remainder.',
          'The remainder must always be less than the divisor.',
          'If the remainder is zero, then the divisor is a factor of the dividend.',
          'This algorithm is the foundation for finding the HCF (Highest Common Factor) of two numbers.'
        ],
        example: {
          title: 'Example: Find HCF of 45 and 12',
          steps: [
            '45 = 12 × 3 + 9 (remainder is 9)',
            '12 = 9 × 1 + 3 (remainder is 3)',
            '9 = 3 × 3 + 0 (remainder is 0)',
            'Since remainder is 0, HCF is the last non-zero remainder: 3'
          ]
        }
      }
    },
    {
      id: 'fundamental',
      title: 'Fundamental Theorem of Arithmetic',
      content: {
        definition: 'Every integer greater than 1 can be represented uniquely as a product of prime numbers.',
        formula: 'N = p₁^a × p₂^b × p₃^c × ... where p₁, p₂, p₃ are primes',
        explanation: [
          'This theorem states that prime factorization of any number is unique except for the order of factors.',
          'Prime numbers are the building blocks of all integers.',
          'The theorem is also known as the Unique Factorization Theorem.',
          'It has applications in number theory and cryptography.'
        ],
        example: {
          title: 'Example: Prime Factorization of 60',
          steps: [
            '60 = 2 × 30',
            '30 = 2 × 15',
            '15 = 3 × 5',
            'Therefore, 60 = 2² × 3¹ × 5¹'
          ]
        }
      }
    },
    {
      id: 'hcf',
      title: 'Finding HCF using Euclid\'s Algorithm',
      content: {
        definition: 'The HCF of two numbers can be found by repeatedly applying Euclid\'s Division Algorithm.',
        explanation: [
          'Step 1: Divide the larger number by the smaller number and find the remainder.',
          'Step 2: Replace the larger number with the smaller number and the smaller number with the remainder.',
          'Step 3: Repeat the process until the remainder is zero.',
          'Step 4: The HCF is the last non-zero remainder.'
        ],
        properties: [
          'HCF(a, b) = HCF(b, a)',
          'HCF(a, b) = HCF(a, b - a) for a < b',
          'HCF(a, b, c) = HCF(HCF(a, b), c)'
        ]
      }
    }
  ];

  const currentTopic = topics.find(t => t.id === activeTopic);

  return (
    <TheoryContainer>
      <TopicSelector>
        {topics.map((topic) => (
          <TopicButton
            key={topic.id}
            active={activeTopic === topic.id}
            onClick={() => setActiveTopic(topic.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {topic.title}
          </TopicButton>
        ))}
      </TopicSelector>

      <ContentArea>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Title>{currentTopic.title}</Title>
          
          <DefinitionCard>
            <DefinitionTitle>Definition</DefinitionTitle>
            <DefinitionText>{currentTopic.content.definition}</DefinitionText>
            {currentTopic.content.formula && (
              <Formula>{currentTopic.content.formula}</Formula>
            )}
          </DefinitionCard>

          <ExplanationSection>
            <SectionTitle>Key Points</SectionTitle>
            <ExplanationList>
              {currentTopic.content.explanation.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PointNumber>{index + 1}</PointNumber>
                  <PointText>{point}</PointText>
                </motion.li>
              ))}
            </ExplanationList>
          </ExplanationSection>

          {currentTopic.content.example && (
            <ExampleCard>
              <ExampleTitle>{currentTopic.content.example.title}</ExampleTitle>
              <StepsList>
                {currentTopic.content.example.steps.map((step, index) => (
                  <StepItem key={index}>
                    <StepNumber>{index + 1}</StepNumber>
                    <StepText>{step}</StepText>
                  </StepItem>
                ))}
              </StepsList>
            </ExampleCard>
          )}

          {currentTopic.content.properties && (
            <PropertiesCard>
              <SectionTitle>Properties</SectionTitle>
              <PropertiesList>
                {currentTopic.content.properties.map((prop, index) => (
                  <PropertyItem key={index}>{prop}</PropertyItem>
                ))}
              </PropertiesList>
            </PropertiesCard>
          )}
        </motion.div>
      </ContentArea>
    </TheoryContainer>
  );
};

const TheoryContainer = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TopicSelector = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
`;

const TopicButton = styled(motion.button)`
  padding: 1rem;
  border: 2px solid ${({ theme, active }) => active ? theme.primary : theme.border};
  background: ${({ theme, active }) => active ? 'rgba(37, 99, 235, 0.1)' : theme.surface};
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => 'rgba(37, 99, 235, 0.05)'};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContentArea = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DefinitionCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DefinitionTitle = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 0.75rem;
`;

const DefinitionText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const Formula = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 1.125rem;
  text-align: center;
`;

const ExplanationSection = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1rem;
`;

const ExplanationList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PointItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const PointNumber = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const PointText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.text};
`;

const ExampleCard = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ExampleTitle = styled.h3`
  font-size: 1.125rem;
  color: white;
  margin-bottom: 1rem;
`;

const StepsList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StepItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const StepNumber = styled.span`
  background: white;
  color: ${({ theme }) => theme.primary};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
`;

const StepText = styled.p`
  font-size: 0.9375rem;
  line-height: 1.5;
  color: white;
`;

const PropertiesCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.5rem;
`;

const PropertiesList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const PropertyItem = styled.li`
  padding: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border-left: 3px solid ${({ theme }) => theme.success};
  border-radius: 4px;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.text};
`;

export default TheorySection;
