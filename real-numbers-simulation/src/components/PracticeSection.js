import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PracticeSection = () => {
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);

  const generateProblems = () => {
    const newProblems = [];
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 100) + 20;
      const b = Math.floor(Math.random() * 50) + 10;
      
      // Calculate HCF using Euclid's algorithm
      let x = a, y = b;
      while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
      }
      
      newProblems.push({
        id: i + 1,
        a,
        b,
        answer: x,
        steps: getSteps(a, b)
      });
    }
    return newProblems;
  };

  const getSteps = (a, b) => {
    const steps = [];
    let x = a, y = b;
    
    while (y !== 0) {
      const q = Math.floor(x / y);
      const r = x % y;
      steps.push({ a: x, b: y, q, r });
      x = y;
      y = r;
    }
    
    return steps;
  };

  useEffect(() => {
    setProblems(generateProblems());
  }, []);

  useEffect(() => {
    if (timerActive) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive]);

  const handleAnswerSubmit = () => {
    if (!userAnswer || isNaN(userAnswer)) return;
    
    const answer = parseInt(userAnswer);
    const correct = problems[currentProblem]?.answer === answer;
    
    setFeedback({
      correct,
      message: correct ? 'Correct! Well done!' : `Incorrect. The correct answer is ${problems[currentProblem]?.answer}.`
    });
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setShowSolution(true);
  };

  const handleNextProblem = () => {
    setUserAnswer('');
    setFeedback(null);
    setShowSolution(false);
    
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(prev => prev + 1);
    } else {
      // Quiz completed
      setCurrentProblem(0);
      setProblems(generateProblems());
      setScore(0);
    }
  };

  const startTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setTimerActive(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentProblemData = problems[currentProblem];

  if (problems.length === 0) {
    return (
      <PracticeContainer>
        <Loading>Generating practice problems...</Loading>
      </PracticeContainer>
    );
  }

  return (
    <PracticeContainer>
      <Title>Practice Problems</Title>
      
      <Description>
        Test your understanding of Euclid's Division Algorithm by solving these practice problems. 
        Find the HCF of the given pairs of numbers.
      </Description>

      <ProgressBar>
        <ProgressFill progress={(currentProblem / problems.length) * 100} />
        <ProgressText>Problem {currentProblem + 1} of {problems.length}</ProgressText>
      </ProgressBar>

      <ScoreDisplay>
        <ScoreValue>Score: {score}/{problems.length}</ScoreValue>
        {timerActive && timeLeft !== null && (
          <TimerDisplay>Time: {formatTime(timeLeft)}</TimerDisplay>
        )}
        {!timerActive && (
          <TimerButton onClick={() => startTimer(5)}>Start 5-min Timer</TimerButton>
        )}
      </ScoreDisplay>

      <ProblemCard>
        <ProblemTitle>Problem {currentProblem + 1}</ProblemTitle>
        <ProblemStatement>
          Find the HCF of <NumberHighlight>{currentProblemData.a}</NumberHighlight> and <NumberHighlight>{currentProblemData.b}</NumberHighlight> 
          using Euclid's Division Algorithm.
        </ProblemStatement>

        <AnswerInput
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
          disabled={feedback !== null}
        />

        <ActionButtons>
          <SubmitButton 
            onClick={handleAnswerSubmit} 
            disabled={!userAnswer || feedback !== null}
          >
            Submit Answer
          </SubmitButton>
          
          {(feedback || showSolution) && (
            <NextButton onClick={handleNextProblem}>
              {currentProblem < problems.length - 1 ? 'Next Problem' : 'Restart Quiz'}
            </NextButton>
          )}
        </ActionButtons>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <FeedbackMessage correct={feedback.correct}>
                {feedback.message}
              </FeedbackMessage>
            </motion.div>
          )}
        </AnimatePresence>

        {showSolution && (
          <SolutionDisplay>
            <SolutionTitle>Solution:</SolutionTitle>
            <StepsList>
              {currentProblemData.steps.map((step, index) => (
                <StepItem key={index}>
                  <StepNumber>{index + 1}.</StepNumber>
                  <StepText>{step.a} = {step.b} × {step.q} + {step.r}</StepText>
                </StepItem>
              ))}
            </StepsList>
            <FinalAnswer>Therefore, HCF = {currentProblemData.answer}</FinalAnswer>
          </SolutionDisplay>
        )}
      </ProblemCard>

      <QuickTips>
        <TipsTitle>Quick Tips:</TipsTitle>
        <TipsList>
          <TipItem>Always divide the larger number by the smaller number</TipItem>
          <TipItem>Continue until the remainder is zero</TipItem>
          <TipItem>The last non-zero remainder is the HCF</TipItem>
          <TipItem>Remember: 0 ≤ remainder < divisor</TipItem>
        </TipsList>
      </QuickTips>
    </PracticeContainer>
  );
};

const PracticeContainer = styled.div`
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

const ProgressBar = styled.div`
  height: 8px;
  background: ${({ theme }) => theme.surface};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  color: white;
  font-weight: 500;
`;

const ScoreDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const ScoreValue = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
`;

const TimerDisplay = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.success};
  font-weight: 600;
`;

const TimerButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

const ProblemCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProblemTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.primary};
`;

const ProblemStatement = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
`;

const NumberHighlight = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
`;

const AnswerInput = styled.input`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1.125rem;
  text-align: center;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.success};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #059669;
  }
`;

const FeedbackMessage = styled.div`
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  background: ${({ correct, theme }) => correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${({ correct, theme }) => correct ? theme.success : theme.error};
  border: 1px solid ${({ correct, theme }) => correct ? theme.success : theme.error};
`;

const SolutionDisplay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
`;

const SolutionTitle = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1rem;
`;

const StepsList = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
`;

const StepNumber = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const StepText = styled.code`
  font-family: 'Courier New', monospace;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.text};
`;

const FinalAnswer = styled.div`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
`;

const QuickTips = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 1.5rem;
`;

const TipsTitle = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1rem;
`;

const TipsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TipItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9375rem;

  &::before {
    content: '✓';
    color: ${({ theme }) => theme.success};
    font-weight: bold;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export default PracticeSection;
