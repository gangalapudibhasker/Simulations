import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AlgorithmVisualizer = () => {
  const [a, setA] = useState(45);
  const [b, setB] = useState(12);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hcf, setHcf] = useState(null);

  const gcd = (a, b) => {
    const steps = [];
    let x = a, y = b;
    
    while (y !== 0) {
      const q = Math.floor(x / y);
      const r = x % y;
      steps.push({ a: x, b: y, q, r, equation: `${x} = ${y} × ${q} + ${r}` });
      x = y;
      y = r;
    }
    
    return { steps, hcf: x };
  };

  const handleCalculate = () => {
    if (a <= 0 || b <= 0) return;
    
    const result = gcd(Math.abs(a), Math.abs(b));
    setSteps(result.steps);
    setHcf(result.hcf);
    setCurrentStep(0);
    setIsAnimating(true);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStep(0);
    setHcf(null);
    setIsAnimating(false);
  };

  useEffect(() => {
    if (steps.length > 0 && isAnimating) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsAnimating(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps, isAnimating]);

  const generateRandomExample = () => {
    const examples = [
      { a: 45, b: 12 },
      { a: 84, b: 36 },
      { a: 105, b: 25 },
      { a: 120, b: 45 },
      { a: 150, b: 75 },
      { a: 210, b: 98 },
      { a: 315, b: 105 },
      { a: 420, b: 150 }
    ];
    const random = examples[Math.floor(Math.random() * examples.length)];
    setA(random.a);
    setB(random.b);
    setSteps([]);
    setCurrentStep(0);
    setHcf(null);
    setIsAnimating(false);
  };

  const currentStepData = steps[currentStep];

  return (
    <VisualizerContainer>
      <Title>Euclid's Division Algorithm Visualizer</Title>
      
      <Description>
        This interactive tool demonstrates how Euclid's Division Algorithm works to find the HCF (Highest Common Factor) 
        of two numbers through repeated division.
      </Description>

      <Controls>
        <InputGroup>
          <InputLabel>First Number (a)</InputLabel>
          <NumberInput
            type="number"
            value={a}
            onChange={(e) => setA(parseInt(e.target.value) || 0)}
            min="1"
          />
        </InputGroup>
        
        <InputGroup>
          <InputLabel>Second Number (b)</InputLabel>
          <NumberInput
            type="number"
            value={b}
            onChange={(e) => setB(parseInt(e.target.value) || 0)}
            min="1"
          />
        </InputGroup>
        
        <ButtonGroup>
          <ActionButton onClick={handleCalculate} disabled={a <= 0 || b <= 0}>
            Calculate HCF
          </ActionButton>
          <ActionButton onClick={generateRandomExample} variant="secondary">
            Random Example
          </ActionButton>
          <ActionButton onClick={handleReset} variant="reset">
            Reset
          </ActionButton>
        </ButtonGroup>
      </Controls>

      <AnimatePresence mode="wait">
        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <VisualizationArea>
              <StepsNavigation>
                <NavButton onClick={handlePreviousStep} disabled={currentStep === 0}>
                  ← Previous
                </NavButton>
                <StepIndicator>
                  Step {currentStep + 1} of {steps.length}
                </StepIndicator>
                <NavButton onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
                  Next →
                </NavButton>
              </StepsNavigation>

              <StepVisualization>
                {currentStepData && (
                  <>
                    <EquationDisplay>
                      <EquationText>{currentStepData.equation}</EquationText>
                    </EquationDisplay>
                    
                    <DivisionVisualization>
                      <BarContainer>
                        <Bar
                          length={currentStepData.a}
                          label={`a = ${currentStepData.a}`}
                          color="#2563eb"
                        />
                      </BarContainer>
                      
                      <BarContainer>
                        <Bar
                          length={currentStepData.b}
                          label={`b = ${currentStepData.b}`}
                          color="#7c3aed"
                        />
                        <RepeatIndicator>× {currentStepData.q}</RepeatIndicator>
                      </BarContainer>
                      
                      <BarContainer>
                        <Bar
                          length={currentStepData.r}
                          label={`r = ${currentStepData.r}`}
                          color="#f59e0b"
                        />
                      </BarContainer>
                    </DivisionVisualization>

                    <ExplanationText>
                      Dividing {currentStepData.a} by {currentStepData.b} gives quotient {currentStepData.q} 
                      and remainder {currentStepData.r}.
                      {currentStepData.r === 0 ? ' Since remainder is 0, we stop here.' : ' We continue with b and r.'}
                    </ExplanationText>
                  </>
                )}
              </StepVisualization>

              {hcf !== null && (
                <ResultDisplay>
                  <ResultTitle>Result</ResultTitle>
                  <ResultValue>HCF = {hcf}</ResultValue>
                  <ResultExplanation>
                    The Highest Common Factor of {a} and {b} is {hcf}.
                    This is the last non-zero remainder in the algorithm.
                  </ResultExplanation>
                </ResultDisplay>
              )}

              <StepsList>
                {steps.map((step, index) => (
                  <StepItem
                    key={index}
                    active={index === currentStep}
                    onClick={() => setCurrentStep(index)}
                  >
                    <StepNumber>{index + 1}</StepNumber>
                    <StepContent>{step.equation}</StepContent>
                  </StepItem>
                ))}
              </StepsList>
            </VisualizationArea>
          </motion.div>
        )}
      </AnimatePresence>

      {steps.length === 0 && !isAnimating && (
        <EmptyState>
          <EmptyIcon>🎯</EmptyIcon>
          <EmptyText>Enter two numbers and click "Calculate HCF" to see the algorithm in action!</EmptyText>
        </EmptyState>
      )}
    </VisualizerContainer>
  );
};

const VisualizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
`;

const Controls = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
`;

const NumberInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  width: 150px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.secondary};
          color: white;
          &:hover { background: ${theme.primary}; }
        `;
      case 'reset':
        return `
          background: transparent;
          color: ${theme.textSecondary};
          border: 1px solid ${theme.border};
          &:hover { background: ${theme.surface}; color: ${theme.text}; }
        `;
      default:
        return `
          background: ${theme.primary};
          color: white;
          &:hover { background: ${theme.secondary}; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const VisualizationArea = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepsNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: ${({ theme }) => theme.text};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StepIndicator = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const StepVisualization = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EquationDisplay = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const EquationText = styled.code`
  font-family: 'Courier New', monospace;
  font-size: 1.25rem;
  color: white;
`;

const DivisionVisualization = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Bar = styled.div`
  height: 30px;
  width: ${({ length }) => Math.min(length * 5, 300)}px;
  background: ${({ color }) => color};
  border-radius: 4px;
  position: relative;
  transition: width 0.5s ease;

  &::after {
    content: '${({ label }) => label}';
    position: absolute;
    top: -25px;
    left: 0;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const RepeatIndicator = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ExplanationText = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  text-align: center;
`;

const ResultDisplay = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.success} 0%, #059669 100%);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`;

const ResultTitle = styled.h3`
  font-size: 1.125rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const ResultValue = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const ResultExplanation = styled.p`
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: ${({ theme, active }) => active ? 'rgba(37, 99, 235, 0.1)' : theme.surface};
  border: 1px solid ${({ theme, active }) => active ? theme.primary : theme.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.05);
  }
`;

const StepNumber = styled.span`
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

const StepContent = styled.code`
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

const EmptyState = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
`;

export default AlgorithmVisualizer;
