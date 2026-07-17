import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const QuizSection = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerActive, setTimerActive] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: 'What is the HCF of 45 and 12 using Euclid\'s Division Algorithm?',
      options: ['3', '5', '9', '15'],
      correctAnswer: '3',
      explanation: '45 = 12 × 3 + 9, 12 = 9 × 1 + 3, 9 = 3 × 3 + 0. HCF is 3.'
    },
    {
      id: 2,
      question: 'According to the Fundamental Theorem of Arithmetic, every integer greater than 1 can be expressed as:',
      options: [
        'A product of two numbers',
        'A product of prime numbers',
        'A sum of prime numbers',
        'A difference of squares'
      ],
      correctAnswer: 'A product of prime numbers',
      explanation: 'The theorem states that every integer > 1 has a unique prime factorization.'
    },
    {
      id: 3,
      question: 'In the equation a = b × q + r, what is the condition for r?',
      options: ['0 < r < b', '0 ≤ r < b', '0 ≤ r ≤ b', 'r = 0'],
      correctAnswer: '0 ≤ r < b',
      explanation: 'The remainder r must satisfy 0 ≤ r < b according to Euclid\'s Division Algorithm.'
    },
    {
      id: 4,
      question: 'What is the HCF of 84 and 36?',
      options: ['12', '6', '24', '18'],
      correctAnswer: '12',
      explanation: '84 = 36 × 2 + 12, 36 = 12 × 3 + 0. HCF is 12.'
    },
    {
      id: 5,
      question: 'Which of the following is NOT a prime number?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
      explanation: '4 can be factored as 2 × 2, so it is not prime.'
    },
    {
      id: 6,
      question: 'The prime factorization of 60 is:',
      options: ['2 × 3 × 10', '2² × 3 × 5', '3 × 4 × 5', '2 × 5 × 6'],
      correctAnswer: '2² × 3 × 5',
      explanation: '60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5 = 2² × 3 × 5'
    },
    {
      id: 7,
      question: 'If HCF(a, b) = 5, which of the following could be true?',
      options: ['a = 10, b = 15', 'a = 10, b = 20', 'a = 5, b = 10', 'a = 25, b = 35'],
      correctAnswer: 'a = 25, b = 35',
      explanation: 'HCF(25, 35) = 5. The other options have different HCFs.'
    },
    {
      id: 8,
      question: 'What is the last non-zero remainder when finding HCF of 105 and 25?',
      options: ['5', '10', '15', '25'],
      correctAnswer: '5',
      explanation: '105 = 25 × 4 + 5, 25 = 5 × 5 + 0. Last non-zero remainder is 5.'
    },
    {
      id: 9,
      question: 'Which theorem guarantees that prime factorization is unique?',
      options: [
        'Pythagorean Theorem',
        'Euclid\'s Division Algorithm',
        'Fundamental Theorem of Arithmetic',
        'Fermat\'s Last Theorem'
      ],
      correctAnswer: 'Fundamental Theorem of Arithmetic',
      explanation: 'This theorem specifically states that prime factorization is unique.'
    },
    {
      id: 10,
      question: 'If a = b × q + r and r = 0, then:',
      options: ['b is a factor of a', 'a is a factor of b', 'q = 1', 'b > a'],
      correctAnswer: 'b is a factor of a',
      explanation: 'If remainder is 0, then b divides a exactly, so b is a factor of a.'
    }
  ];

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            setQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timerActive, timeLeft]);

  const startQuiz = () => {
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
    setQuizStarted(true);
    setQuizCompleted(false);
    setTimeLeft(300);
    setTimerActive(true);
  };

  const handleOptionSelect = (option) => {
    if (feedback !== null) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    setFeedback({ isCorrect, message: isCorrect ? 'Correct!' : 'Incorrect' });
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      setTimerActive(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getPerformanceMessage = () => {
    const percentage = calculatePercentage();
    if (percentage >= 90) return { text: 'Excellent!', color: '#10b981' };
    if (percentage >= 75) return { text: 'Great job!', color: '#3b82f6' };
    if (percentage >= 50) return { text: 'Good effort!', color: '#f59e0b' };
    return { text: 'Keep practicing!', color: '#ef4444' };
  };

  if (!quizStarted) {
    return (
      <QuizContainer>
        <Title>Real Numbers Quiz</Title>
        <Description>
          Test your knowledge of Euclid's Division Algorithm and the Fundamental Theorem of Arithmetic. 
          This quiz contains 10 multiple-choice questions.
        </Description>
        
        <StartCard>
          <StartTitle>Ready to begin?</StartTitle>
          <FeaturesList>
            <FeatureItem>10 multiple-choice questions</FeatureItem>
            <FeatureItem>5-minute time limit</FeatureItem>
            <FeatureItem>Instant feedback</FeatureItem>
            <FeatureItem>Detailed explanations</FeatureItem>
          </FeaturesList>
          <StartButton onClick={startQuiz}>Start Quiz</StartButton>
        </StartCard>
      </QuizContainer>
    );
  }

  if (quizCompleted) {
    return (
      <QuizContainer>
        <Title>Quiz Completed!</Title>
        
        <ResultCard>
          <ResultTitle>Your Results</ResultTitle>
          
          <ScoreCircle percentage={calculatePercentage()}>
            <ScoreValue>{calculatePercentage()}%</ScoreValue>
            <ScoreLabel>Score</ScoreLabel>
          </ScoreCircle>
          
          <ResultDetails>
            <DetailItem>
              <DetailLabel>Correct Answers:</DetailLabel>
              <DetailValue>{score}/{questions.length}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Time Taken:</DetailLabel>
              <DetailValue>{formatTime(300 - timeLeft)}</DetailValue>
            </DetailItem>
          </ResultDetails>
          
          <PerformanceMessage color={getPerformanceMessage().color}>
            {getPerformanceMessage().text}
          </PerformanceMessage>
          
          <ActionButtons>
            <RetryButton onClick={startQuiz}>Retry Quiz</RetryButton>
            <BackButton onClick={() => setQuizStarted(false)}>Back to Menu</BackButton>
          </ActionButtons>
        </ResultCard>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizHeader>
        <Timer>Time: {formatTime(timeLeft)}</Timer>
        <Progress>Question {currentQuestion + 1} of {questions.length}</Progress>
        <Score>Score: {score}</Score>
      </QuizHeader>

      <QuestionCard>
        <QuestionText>{questions[currentQuestion].question}</QuestionText>
        
        <OptionsList>
          {questions[currentQuestion].options.map((option, index) => (
            <OptionItem
              key={index}
              selected={selectedOption === option}
              correct={feedback?.isCorrect && option === questions[currentQuestion].correctAnswer}
              incorrect={feedback?.isCorrect === false && selectedOption === option}
              onClick={() => handleOptionSelect(option)}
              disabled={feedback !== null}
            >
              <OptionLetter>{String.fromCharCode(65 + index)}</OptionLetter>
              <OptionText>{option}</OptionText>
            </OptionItem>
          ))}
        </OptionsList>

        <ActionButtons>
          <SubmitButton 
            onClick={handleSubmit} 
            disabled={selectedOption === null || feedback !== null}
          >
            Submit Answer
          </SubmitButton>
          
          {feedback && (
            <NextButton onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
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
              <FeedbackDisplay correct={feedback.isCorrect}>
                <FeedbackMessage>{feedback.message}</FeedbackMessage>
                <Explanation>{questions[currentQuestion].explanation}</Explanation>
              </FeedbackDisplay>
            </motion.div>
          )}
        </AnimatePresence>
      </QuestionCard>
    </QuizContainer>
  );
};

const QuizContainer = styled.div`
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

const StartCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const StartTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.li`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textSecondary};
  
  &::before {
    content: '✓';
    color: ${({ theme }) => theme.success};
    margin-right: 0.5rem;
  }
`;

const StartButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
  }
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Timer = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
`;

const Progress = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const Score = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.success};
  font-weight: 600;
`;

const QuestionCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuestionText = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme, selected, correct, incorrect }) => {
    if (correct) return 'rgba(16, 185, 129, 0.1)';
    if (incorrect) return 'rgba(239, 68, 68, 0.1)';
    if (selected) return 'rgba(37, 99, 235, 0.1)';
    return theme.surface;
  }};
  border: 2px solid ${({ theme, selected, correct }) => {
    if (correct) return theme.success;
    if (selected) return theme.primary;
    return theme.border;
  }};
  border-radius: 8px;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};

  &:hover:not(:disabled) {
    background: rgba(37, 99, 235, 0.05);
    border-color: ${({ theme }) => theme.primary};
  }
`;

const OptionLetter = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
`;

const OptionText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
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

const FeedbackDisplay = styled.div`
  background: ${({ correct, theme }) => correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${({ correct, theme }) => correct ? theme.success : theme.error};
  border-radius: 8px;
  padding: 1rem;
`;

const FeedbackMessage = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ correct, theme }) => correct ? theme.success : theme.error};
  margin-bottom: 0.5rem;
`;

const Explanation = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
`;

const ResultCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const ScoreCircle = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ theme, percentage }) => theme.primary} ${({ percentage }) => percentage * 3.6}deg,
    ${({ theme }) => theme.surface} 0deg
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 130px;
    height: 130px;
    background: ${({ theme }) => theme.surface};
    border-radius: 50%;
  }
`;

const ScoreValue = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  position: relative;
  z-index: 1;
`;

const ScoreLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  position: relative;
  z-index: 1;
`;

const ResultDetails = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailLabel = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const PerformanceMessage = styled.p`
  font-size: 1.25rem;
  color: ${({ color }) => color};
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const RetryButton = styled.button`
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

const BackButton = styled.button`
  padding: 0.75rem 2rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.surface};
    border-color: ${({ theme }) => theme.primary};
  }
`;

export default QuizSection;
